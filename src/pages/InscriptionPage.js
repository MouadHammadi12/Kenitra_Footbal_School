import React from 'react';
import { Link } from 'react-router-dom';
import { addDoc, collection, Timestamp, query, or, where, getDocs } from 'firebase/firestore';
import '../App.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { db } from '../firebase';

const INITIAL = { fullName: '', phone: '', age: '', email: '' };

export default function InscriptionPage() {
  const [form, setForm] = React.useState(INITIAL);
  const [busy, setBusy] = React.useState(false);
  const [msg, setMsg] = React.useState(null);
  const canSubmit = Boolean(db);

  function onChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setMsg(null);

    if (!canSubmit) {
      setMsg({ type: 'err', title: 'Service Unavailable', text: 'The registration system is initializing. Please try again in a few moments.' });
      return;
    }

    const ageNum = Number(form.age);
    if (!form.fullName.trim() || !form.phone.trim() || !form.email.trim() || !Number.isFinite(ageNum)) {
      setMsg({ type: 'err', title: 'Missing Information', text: 'Please ensure all required fields are filled out correctly.' });
      return;
    }
    if (ageNum < 4 || ageNum > 99) {
      setMsg({ type: 'err', title: 'Invalid Entry', text: 'Participant age must be between 4 and 99 years.' });
      return;
    }

    setBusy(true);
    try {
      // 1. Check for duplicates
      const dupQuery = query(
        collection(db, 'inscriptions'),
        or(
          where('email', '==', form.email.trim().toLowerCase()),
          where('fullName', '==', form.fullName.trim())
        )
      );
      const snap = await getDocs(dupQuery);

      if (!snap.empty) {
        setMsg({ type: 'err', title: 'Duplicate Record', text: 'A registration under this email address or full name already exists.' });
        setBusy(false);
        return;
      }

      // 2. If no duplicates, submit
      await addDoc(collection(db, 'inscriptions'), {
        fullName: form.fullName.trim(),
        phone: form.phone.trim(),
        age: ageNum,
        email: form.email.trim().toLowerCase(),
        status: 'pending',
        createdAt: Timestamp.now(),
      });
      setForm(INITIAL);
      setMsg({ type: 'ok', title: 'Application Submitted', text: 'Your registration has been successfully recorded. Our team will contact you shortly.' });
    } catch (err) {
      setMsg({ type: 'err', title: 'Unexpected Error', text: err?.message || 'We encountered a problem processing your request. Please try again later.' });
    } finally {
      if (busy) setBusy(false);
    }
  }

  return (
    <div className="App">
      <div className="Shell">
        <Navbar />

        <main className="Main">
          <section className="Section">
            <div className="SectionHeader">
              <h1 className="SectionTitle">Registration</h1>
              <p className="SectionSubtitle">Fill the form to register.</p>
            </div>

            <div className="Card InscriptionCard">
              <form className="Form" onSubmit={onSubmit}>
                <label className="Field">
                  <span>Full name</span>
                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={onChange}
                    autoComplete="name"
                    placeholder="First and last name"
                    required
                  />
                </label>
                <label className="Field">
                  <span>Phone number</span>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={onChange}
                    autoComplete="tel"
                    placeholder="+212 …"
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
                    value={form.age}
                    onChange={onChange}
                    placeholder="Age"
                    required
                  />
                </label>
                <label className="Field">
                  <span>Email</span>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={onChange}
                    autoComplete="email"
                    placeholder="you@example.com"
                    required
                  />
                </label>

                {msg ? (
                  <div className={`PremiumAlert ${msg.type === 'ok' ? 'AlertSuccess' : 'AlertError'}`} role="status">
                    <div className="AlertIcon">
                      {msg.type === 'ok' ? (
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      ) : (
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      )}
                    </div>
                    <div className="AlertContent">
                      <div className="AlertTitle">{msg.title}</div>
                      <div className="AlertText">{msg.text}</div>
                    </div>
                  </div>
                ) : null}

                <button className="Button ButtonPrimary ButtonFull" type="submit" disabled={busy}>
                  {busy ? 'Processing...' : 'Submit registration'}
                </button>
              </form>

              <div className="Divider" />
              <p className="Hint">
                <Link to="/">← Back to home</Link>
              </p>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}
