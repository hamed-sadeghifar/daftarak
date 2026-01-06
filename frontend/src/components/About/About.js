import { useEffect, useState } from "react";
import "./About.css";

export default function About() {
  const API_URL = "http://localhost:5000/api/about";
  const [formData, setFormData] = useState({
    paragraph1: "",
    paragraph2: "",
    paragraph3: "",
  });
  const [loading, setLoading] = useState(true);

  /* ======================
  GET about data
    ====================== */
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setFormData({
            paragraph1: data.paragraph1 || "",
            paragraph2: data.paragraph2 || "",
            paragraph3: data.paragraph3 || "",
          });
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);
  if (loading) {
    return (
      <section id="about">
        <p style={{ color: "#00ffcc" }}>در حال بارگذاری...</p>
      </section>
    );
  }
  return (
    <>
      <section id="about">
        <p>{formData.paragraph1}</p>
        <p>{formData.paragraph2}</p>
        <p>{formData.paragraph3}</p>
      </section>
    </>
  );
}
