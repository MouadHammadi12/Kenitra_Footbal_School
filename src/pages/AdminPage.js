import React from 'react';
import { Link } from 'react-router-dom';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import '../App.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { auth, db } from '../firebase';

function formatDate(ts) {
  if (!ts) return '—';
  try {
    const d = ts.toDate ? ts.toDate() : new Date(ts);
    return d.toLocaleString();
  } catch {
    return '—';
  }
}

export default function AdminPage() {
  const EMPTY_FORM = { fullName: '', phone: '', age: '', email: '' };
  const [user, setUser] = React.useState(undefined);
  const [adminOk, setAdminOk] = React.useState(false);
  const [authChecked, setAuthChecked] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [loginEmail, setLoginEmail] = React.useState('');
  const [loginPassword, setLoginPassword] = React.useState('');
  const [loginBusy, setLoginBusy] = React.useState(false);
  const [loginErr, setLoginErr] = React.useState(null);
  const [updatingId, setUpdatingId] = React.useState(null);
  const [adminForm, setAdminForm] = React.useState(EMPTY_FORM);
  const [creating, setCreating] = React.useState(false);

  const firebaseReady = Boolean(auth && db);

  React.useEffect(() => {
    if (!firebaseReady) {
      setAuthChecked(true);
      return undefined;
    }

    return onAuthStateChanged(auth, async (u) => {
      if (!u) {
        setUser(null);
        setAdminOk(false);
        setRows([]);
        setAuthChecked(true);
        return;
      }
      try {
        const snap = await getDoc(doc(db, 'admins', u.uid));
        if (!snap.exists()) {
          setLoginErr({ text: 'This account is not an administrator.' });
          await signOut(auth);
          setUser(null);
          setAdminOk(false);
        } else {
          setLoginErr(null);
          setUser(u);
          setAdminOk(true);
        }
      } catch (e) {
        setLoginErr({ text: e?.message || 'Could not verify admin access.' });
        setUser(null);
        setAdminOk(false);
      } finally {
        setAuthChecked(true);
      }
    });
  }, [firebaseReady]);

  React.useEffect(() => {
    if (!firebaseReady) return undefined;
    if (!user || !adminOk) return undefined;
    const q = query(collection(db, 'inscriptions'), orderBy('createdAt', 'desc'));
    return onSnapshot(
      q,
      (snap) => {
        setRows(
          snap.docs.map((d) => ({
            id: d.id,
            ...d.data(),
          }))
        );
      },
      (err) => {
        setLoginErr({ text: err?.message || 'Could not load registrations.' });
      }
    );
  }, [firebaseReady, user, adminOk]);

  async function onLogin(e) {
    e.preventDefault();
    setLoginErr(null);
    if (!firebaseReady) {
      setLoginErr({ text: 'Admin service is not ready yet. Please refresh and try again.' });
      return;
    }
    setLoginBusy(true);
    try {
      await signInWithEmailAndPassword(auth, loginEmail.trim(), loginPassword);
      setLoginPassword('');
    } catch (err) {
      setLoginErr({ text: err?.message || 'Sign-in failed.' });
    } finally {
      setLoginBusy(false);
    }
  }

  async function setStatus(id, status) {
    setUpdatingId(id);
    setLoginErr(null);
    try {
      await updateDoc(doc(db, 'inscriptions', id), {
        status,
        reviewedAt: Timestamp.now(),
      });
    } catch (err) {
      setLoginErr({ text: err?.message || 'Update failed.' });
    } finally {
      setUpdatingId(null);
    }
  }

  async function deleteInscription(id) {
    setUpdatingId(id);
    setLoginErr(null);
    try {
      await deleteDoc(doc(db, 'inscriptions', id));
    } catch (err) {
      setLoginErr({ text: err?.message || 'Delete failed.' });
    } finally {
      setUpdatingId(null);
    }
  }

  function onAdminFormChange(e) {
    const { name, value } = e.target;
    setAdminForm((prev) => ({ ...prev, [name]: value }));
  }

  async function createInscriptionAsAdmin(e) {
    e.preventDefault();
    setLoginErr(null);
    const ageNum = Number(adminForm.age);
    if (!adminForm.fullName.trim() || !adminForm.phone.trim() || !adminForm.email.trim() || !Number.isFinite(ageNum)) {
      setLoginErr({ text: 'Please fill all fields with a valid age.' });
      return;
    }
    if (ageNum < 4 || ageNum > 99) {
      setLoginErr({ text: 'Age must be between 4 and 99.' });
      return;
    }

    setCreating(true);
    try {
      await addDoc(collection(db, 'inscriptions'), {
        fullName: adminForm.fullName.trim(),
        phone: adminForm.phone.trim(),
        age: ageNum,
        email: adminForm.email.trim().toLowerCase(),
        status: 'pending',
        createdAt: Timestamp.now(),
      });
      setAdminForm(EMPTY_FORM);
    } catch (err) {
      setLoginErr({ text: err?.message || 'Could not create inscription.' });
    } finally {
      setCreating(false);
    }
  }

  async function onLogout() {
    setLoginErr(null);
    await signOut(auth);
  }

  return (
    <div className="App">
      <div className="Shell">
        <Navbar />

        <main className="Main">
          <section className="Section">
            <div className="SectionHeader">
              <h1 className="SectionTitle">Admin</h1>
              <p className="SectionSubtitle">Review registrations and set them to validated or rejected.</p>
            </div>

            {!firebaseReady || !authChecked ? (
              <div className="Card InscriptionCard">
                <p className="Hint">Loading…</p>
              </div>
            ) : !user || !adminOk ? (
              <div className="Card InscriptionCard">
                <form className="Form" onSubmit={onLogin}>
                  <label className="Field">
                    <span>Email</span>
                    <input
                      type="email"
                      autoComplete="username"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                  </label>
                  <label className="Field">
                    <span>Password</span>
                    <input
                      type="password"
                      autoComplete="current-password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                  </label>
                  {loginErr ? (
                    <p className="FormNotice FormNoticeErr" role="alert">
                      {loginErr.text}
                    </p>
                  ) : null}
                  <button className="Button ButtonPrimary ButtonFull" type="submit" disabled={loginBusy}>
                    {loginBusy ? 'Signing in…' : 'Sign in'}
                  </button>
                </form>
                <p className="Hint">
                  <Link to="/">← Back to home</Link>
                </p>
              </div>
            ) : (
              <div className="Card InscriptionCard AdminCard">
                <div className="AdminToolbar">
                  <span className="AdminSignedIn">Signed in as {user.email}</span>
                  <button type="button" className="Button ButtonGhost" onClick={onLogout}>
                    Sign out
                  </button>
                </div>

                <div className="AdminCreateWrap">
                  <div className="CardTitle">Add inscription as admin</div>
                  <form className="Form AdminCreateForm" onSubmit={createInscriptionAsAdmin}>
                    <label className="Field">
                      <span>Full name</span>
                      <input
                        name="fullName"
                        value={adminForm.fullName}
                        onChange={onAdminFormChange}
                        placeholder="Player full name"
                        required
                      />
                    </label>
                    <label className="Field">
                      <span>Phone</span>
                      <input
                        name="phone"
                        value={adminForm.phone}
                        onChange={onAdminFormChange}
                        placeholder="+212..."
                        required
                      />
                    </label>
                    <label className="Field">
                      <span>Age</span>
                      <input
                        name="age"
                        type="number"
                        min={4}
                        max={99}
                        value={adminForm.age}
                        onChange={onAdminFormChange}
                        placeholder="Age"
                        required
                      />
                    </label>
                    <label className="Field">
                      <span>Email</span>
                      <input
                        name="email"
                        type="email"
                        value={adminForm.email}
                        onChange={onAdminFormChange}
                        placeholder="email@example.com"
                        required
                      />
                    </label>
                    <button className="Button ButtonPrimary ButtonSm" type="submit" disabled={creating}>
                      {creating ? 'Adding…' : 'Add inscription'}
                    </button>
                  </form>
                </div>

                {loginErr ? (
                  <p className="FormNotice FormNoticeErr" role="alert">
                    {loginErr.text}
                  </p>
                ) : null}

                <div className="AdminTableWrap">
                  <div className="Row Head AdminRow">
                    <span>Name</span>
                    <span>Phone</span>
                    <span>Age</span>
                    <span>Email</span>
                    <span>Status</span>
                    <span>Created</span>
                    <span>Actions</span>
                  </div>
                  {rows.length === 0 ? (
                    <p className="Hint AdminEmpty">No registrations yet.</p>
                  ) : (
                    rows.map((r) => (
                      <div key={r.id} className="Row AdminRow">
                        <span className="AdminCell" data-label="Name" title={r.fullName}>
                          {r.fullName}
                        </span>
                        <span className="AdminCell" data-label="Phone" title={r.phone}>
                          {r.phone}
                        </span>
                        <span className="AdminCell" data-label="Age">
                          {r.age}
                        </span>
                        <span className="AdminCell AdminEmail" data-label="Email" title={r.email}>
                          {r.email}
                        </span>
                        <span className="AdminCell" data-label="Status">
                          <span className={`StatusPill StatusPill--${r.status || 'pending'}`}>{r.status || 'pending'}</span>
                        </span>
                        <span className="AdminCell AdminDate" data-label="Created">
                          {formatDate(r.createdAt)}
                        </span>
                        <span className="AdminCell AdminActions" data-label="Actions">
                          {r.status === 'pending' ? (
                            <>
                              <button
                                type="button"
                                className="Button ButtonPrimary ButtonSm"
                                disabled={updatingId === r.id}
                                onClick={() => setStatus(r.id, 'validated')}
                              >
                                Validate
                              </button>
                              <button
                                type="button"
                                className="Button ButtonGhost ButtonSm"
                                disabled={updatingId === r.id}
                                onClick={() => setStatus(r.id, 'rejected')}
                              >
                                Reject
                              </button>
                              <button
                                type="button"
                                className="Button ButtonDanger ButtonSm"
                                disabled={updatingId === r.id}
                                onClick={() => deleteInscription(r.id)}
                              >
                                Delete
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                type="button"
                                className="Button ButtonGhost ButtonSm"
                                disabled={updatingId === r.id}
                                onClick={() => setStatus(r.id, 'pending')}
                              >
                                Reset to pending
                              </button>
                              <button
                                type="button"
                                className="Button ButtonDanger ButtonSm"
                                disabled={updatingId === r.id}
                                onClick={() => deleteInscription(r.id)}
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </span>
                      </div>
                    ))
                  )}
                </div>

              </div>
            )}
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}
