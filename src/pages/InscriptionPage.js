import React from 'react';
import { Link } from 'react-router-dom';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
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
      setMsg({ type: 'err', text: 'Registration service is not ready yet. Please try again in a moment.' });
      return;
    }

    const ageNum = Number(form.age);
    if (!form.fullName.trim() || !form.phone.trim() || !form.email.trim() || !Number.isFinite(ageNum)) {
      setMsg({ type: 'err', text: 'Please fill all fields with a valid age.' });
      return;
    }
    if (ageNum < 4 || ageNum > 99) {
      setMsg({ type: 'err', text: 'Age must be between 4 and 99.' });
      return;
    }

    setBusy(true);
    try {
      await addDoc(collection(db, 'inscriptions'), {
        fullName: form.fullName.trim(),
        phone: form.phone.trim(),
        age: ageNum,
        email: form.email.trim().toLowerCase(),
        status: 'pending',
        createdAt: Timestamp.now(),
      });
      setForm(INITIAL);
      setMsg({ type: 'ok', text: 'Registration received. We will contact you soon.' });
    } catch (err) {
      setMsg({ type: 'err', text: err?.message || 'Something went wrong. Try again later.' });
    } finally {
      setBusy(false);
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
                  <p className={msg.type === 'ok' ? 'FormNotice FormNoticeOk' : 'FormNotice FormNoticeErr'} role="status">
                    {msg.text}
                  </p>
                ) : null}

                <button className="Button ButtonPrimary ButtonFull" type="submit" disabled={busy}>
                  {busy ? 'Sending…' : 'Submit registration'}
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
