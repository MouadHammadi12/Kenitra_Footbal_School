import React from 'react';
import { Link } from 'react-router-dom';
import {
  collection,
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
  const [user, setUser] = React.useState(undefined);
  const [adminOk, setAdminOk] = React.useState(false);
  const [authChecked, setAuthChecked] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [loginEmail, setLoginEmail] = React.useState('');
  const [loginPassword, setLoginPassword] = React.useState('');
  const [loginBusy, setLoginBusy] = React.useState(false);
  const [loginErr, setLoginErr] = React.useState(null);
  const [updatingId, setUpdatingId] = React.useState(null);

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
                            </>
                          ) : (
                            <button
                              type="button"
                              className="Button ButtonGhost ButtonSm"
                              disabled={updatingId === r.id}
                              onClick={() => setStatus(r.id, 'pending')}
                            >
                              Reset to pending
                            </button>
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
