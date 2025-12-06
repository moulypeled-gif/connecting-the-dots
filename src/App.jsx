import React, { useState, useMemo, useEffect } from "react";

// --- סטיילים כלליים --- //

const appContainerStyle = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  padding: "24px",
  background: "#f8fafc",
  direction: "rtl",
  fontFamily:
    "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};

const shellStyle = {
  background: "#ffffff",
  borderRadius: 16,
  padding: 24,
  boxShadow: "0 4px 10px rgba(15, 23, 42, 0.08)",
  maxWidth: 1200,
  width: "100%",
  boxSizing: "border-box",
};

const headerBarStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 16,
};

const headerSideButtonStyle = {
  borderRadius: 9999,
  border: "1px solid #e2e8f0",
  background: "#fff",
  width: 40,
  height: 40,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  fontSize: 18,
};

const headerTitleWrapperStyle = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  pointerEvents: "none",
};

const headerTitleStyle = {
  fontWeight: 700,
  fontSize: 22,
  color: "#0f172a",
};

const sectionTitleStyle = {
  fontSize: 20,
  fontWeight: 600,
  marginBottom: 4,
};

const sectionSubTitleStyle = {
  fontSize: 14,
  color: "#64748b",
};

const tileGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 16,
};

const tileStyle = {
  borderRadius: 16,
  border: "1px solid #e2e8f0",
  padding: 16,
  background: "#f8fafc",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

const tileTitleStyle = {
  fontWeight: 600,
  fontSize: 16,
  marginBottom: 4,
};

const tileSubTitleStyle = {
  fontSize: 13,
  color: "#64748b",
};

const pillButtonStyle = {
  borderRadius: 9999,
  border: "1px solid #e2e8f0",
  padding: "6px 12px",
  fontSize: 13,
  background: "#ffffff",
  cursor: "pointer",
};

const smallIconButton = {
  borderRadius: 9999,
  border: "1px solid #e2e8f0",
  background: "#f8fafc",
  width: 32,
  height: 32,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  fontSize: 14,
};

const smallIconButtonDanger = {
  ...smallIconButton,
  background: "#fee2e2",
};

const errorTextStyle = {
  color: "#b91c1c",
  fontSize: 13,
  marginBottom: 8,
};

const successTextStyle = {
  color: "#15803d",
  fontSize: 13,
  marginBottom: 8,
};

const inputRoundedStyle = {
  borderRadius: 9999,
  border: "1px solid #cbd5f5",
  padding: "8px 10px",
  fontSize: 14,
  width: "100%",
  boxSizing: "border-box",
};

const textInputStyle = {
  borderRadius: 8,
  border: "1px solid #cbd5f5",
  padding: "8px 10px",
  fontSize: 14,
  width: "100%",
  boxSizing: "border-box",
};

const headerSortButtonStyle = {
  background: "none",
  border: "none",
  padding: 0,
  margin: 0,
  fontSize: 13,
  color: "#64748b",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
};

const contactActionButtonStyle = (enabled) => ({
  borderRadius: "50%",
  width: 30,
  height: 30,
  border: "1px solid #e2e8f0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 15,
  cursor: enabled ? "pointer" : "default",
  background: enabled ? "#f1f5f9" : "#f9fafb",
  opacity: enabled ? 1 : 0.4,
});

// --- נתונים התחלתיים --- //

const initialContactLists = [
  { id: "gov-namram", name: `פורום מנמ"רִים ממשלתי` },
  { id: "gov-cio", name: "פורום CIO ממשלתי" },
];

const initialContacts = [
  {
    id: 1,
    firstName: "דנה",
    lastName: "כהן",
    role: `מנמ"ר משרד הבריאות`,
    org: "משרד הבריאות",
    email: "dana@example.gov.il",
    phone: "+972501234567",
    imageUrl: "",
    listIds: ["gov-namram"],
  },
  {
    id: 2,
    firstName: "אייל",
    lastName: "לוי",
    role: "CIO משרד התחבורה",
    org: "משרד התחבורה",
    email: "eyal@example.gov.il",
    phone: "+972541112233",
    imageUrl: "",
    listIds: ["gov-cio"],
  },
  {
    id: 3,
    firstName: "מורן",
    lastName: "רוזן",
    role: 'סמנכ"לית דיגיטל',
    org: "משרד האוצר",
    email: "moran@example.gov.il",
    phone: "+972521234999",
    imageUrl: "",
    listIds: ["gov-namram", "gov-cio"],
  },
];

// --- Header עליון --- //

function TopHeader({ onHome, onSettings }) {
  return (
    <div style={headerBarStyle}>
      <button
        type="button"
        style={headerSideButtonStyle}
        onClick={onHome}
        title="בית"
      >
        🏠
      </button>

      <div style={headerTitleWrapperStyle}>
        <div style={headerTitleStyle}>Connecting the Dots</div>
      </div>

      <button
        type="button"
        style={headerSideButtonStyle}
        onClick={onSettings}
        title="ממשק ניהול"
      >
        ⚙️
      </button>
    </div>
  );
}

// --- מסך בית: בחירת דף קשר --- //

function HomeView({ contactLists, onSelectList }) {
  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <div style={sectionTitleStyle}>בחר דף קשר להצגה</div>
        <div style={sectionSubTitleStyle}>
          בחר את המסגרת הרצויה כדי לצפות בדף הקשר של בעלי התפקידים.
        </div>
      </div>

      <div style={tileGridStyle}>
        {contactLists.map((list) => (
          <div
            key={list.id}
            style={tileStyle}
            onClick={() => onSelectList(list.id)}
          >
            <div>
              <div style={tileTitleStyle}>{list.name}</div>
              <div style={tileSubTitleStyle}>
                דף קשר מרוכז של בעלי תפקידי דיגיטל במסגרת זו.
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- כרטיס איש קשר --- //

function ContactCard({ contact, adminEmail }) {
  const [showImageModal, setShowImageModal] = useState(false);

  const fullName = `${contact.firstName} ${contact.lastName}`;
  const hasEmail = !!contact.email;
  const hasPhone = !!contact.phone;
  const hasAdminEmail = !!(adminEmail && adminEmail.trim());

  const mailHref = hasEmail ? `mailto:${contact.email}` : null;
  const phoneHref = hasPhone ? `tel:${contact.phone}` : null;
  const whatsappHref = hasPhone
    ? `https://wa.me/${contact.phone.replace(/[^\d]/g, "")}`
    : null;

  const adminMailHref = hasAdminEmail
    ? `mailto:${encodeURIComponent(
        adminEmail.trim()
      )}?subject=${encodeURIComponent(
        `הצעה לעדכון פרטי קשר – ${fullName}`
      )}&body=${encodeURIComponent(
        `שלום,\n\nברצוני להציע עדכון לפרטי איש הקשר הבא:\n\nשם: ${fullName}\nתפקיד: ${
          contact.role || ""
        }\nארגון: ${contact.org || ""}\n\nשינוי מוצע:\n\nתודה!`
      )}`
    : null;

  return (
    <>
      <div
        style={{
          borderRadius: 14,
          border: "1px solid #e2e8f0",
          padding: 12,
          background: "#ffffff",
          display: "flex",
          gap: 12,
          alignItems: "stretch",
          boxSizing: "border-box",
          height: "100%",
        }}
      >
        <div
          style={{
            width: 120,
            minWidth: 120,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 12,
            background: "#e2e8f0",
            overflow: "hidden",
            cursor: contact.imageUrl ? "pointer" : "default",
          }}
          onClick={() => contact.imageUrl && setShowImageModal(true)}
        >
          {contact.imageUrl ? (
            <img
              src={contact.imageUrl}
              alt={fullName}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <span style={{ fontSize: 32, color: "#94a3b8" }}>👤</span>
          )}
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 17,
                fontWeight: 700,
                marginBottom: 4,
              }}
            >
              {fullName}
            </div>
            <div style={{ fontSize: 14, color: "#64748b", marginBottom: 2 }}>
              {contact.role}
            </div>
            <div style={{ fontSize: 14, color: "#0f172a" }}>{contact.org}</div>
          </div>

          <div
            style={{
              display: "flex",
              gap: 8,
              marginTop: 8,
              justifyContent: "flex-start",
            }}
          >
            <button
              type="button"
              style={contactActionButtonStyle(hasEmail)}
              title={hasEmail ? contact.email : "אין כתובת מייל"}
              disabled={!hasEmail}
              onClick={() => mailHref && (window.location.href = mailHref)}
            >
              ✉️
            </button>

            <button
              type="button"
              style={contactActionButtonStyle(hasPhone)}
              title={hasPhone ? contact.phone : "אין טלפון נייד"}
              disabled={!hasPhone}
              onClick={() => phoneHref && (window.location.href = phoneHref)}
            >
              📞
            </button>

            <button
              type="button"
              style={contactActionButtonStyle(hasPhone)}
              title={
                hasPhone
                  ? `שליחת הודעה בוואטסאפ ל־${contact.phone}`
                  : "אין טלפון נייד"
              }
              disabled={!hasPhone}
              onClick={() =>
                whatsappHref &&
                window.open(whatsappHref, "_blank", "noopener,noreferrer")
              }
            >
              💬
            </button>

            <button
              type="button"
              style={contactActionButtonStyle(hasAdminEmail)}
              title={
                hasAdminEmail
                  ? "שליחת הצעה לעדכון למנהל המערכת"
                  : "יש להגדיר מייל מנהל בממשק הניהול"
              }
              disabled={!hasAdminEmail}
              onClick={() => adminMailHref && (window.location.href = adminMailHref)}
            >
              ✏️
            </button>
          </div>
        </div>
      </div>

      {showImageModal && contact.imageUrl && (
        <div
          onClick={() => setShowImageModal(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15,23,42,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              borderRadius: 12,
              overflow: "hidden",
              background: "#000",
            }}
          >
            <img
              src={contact.imageUrl}
              alt={fullName}
              style={{
                display: "block",
                maxWidth: "90vw",
                maxHeight: "90vh",
                objectFit: "contain",
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}

// --- תצוגת דף קשר --- //

function ContactListView({ list, contacts, adminEmail }) {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("lastName"); // lastName | org | role

  const listContacts = useMemo(() => {
    const base = contacts.filter((c) => (c.listIds || []).includes(list.id));

    const filtered = !search.trim()
      ? base
      : base.filter((c) => {
          const term = search.trim().toLowerCase();
          const combined = [
            c.firstName,
            c.lastName,
            c.role,
            c.org,
            c.email,
            c.phone,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();
          return combined.includes(term);
        });

    const arr = [...filtered];
    arr.sort((a, b) => {
      let av = "";
      let bv = "";
      if (sortField === "lastName") {
        av = (a.lastName || "") + " " + (a.firstName || "");
        bv = (b.lastName || "") + " " + (b.firstName || "");
      } else if (sortField === "org") {
        av = a.org || "";
        bv = b.org || "";
      } else if (sortField === "role") {
        av = a.role || "";
        bv = b.role || "";
      }
      return av.localeCompare(bv, "he");
    });

    return arr;
  }, [contacts, list.id, search, sortField]);

  return (
    <div>
      <div
        style={{
          marginBottom: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <div>
          <div style={sectionTitleStyle}>דף קשר – {list.name}</div>
          <div style={sectionSubTitleStyle}>
            רשימת אנשי קשר המשויכים לדף זה. ניתן ליצור קשר ישירות מתוך
            הכרטיסים.
          </div>
        </div>

        <div style={{ minWidth: 260, maxWidth: 400 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 8,
              fontSize: 13,
            }}
          >
            <span>מיון לפי:</span>
            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value)}
              style={{
                ...inputRoundedStyle,
                padding: "4px 10px",
                fontSize: 13,
              }}
            >
              <option value="lastName">שם משפחה</option>
              <option value="org">ארגון</option>
              <option value="role">תפקיד</option>
            </select>
          </div>
          <input
            style={inputRoundedStyle}
            placeholder="חיפוש לפי שם, תפקיד, ארגון..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          alignItems: "stretch",
        }}
      >
        {listContacts.map((c) => (
          <div
            key={c.id}
            style={{
              flex: "1 1 260px",
              minWidth: 260,
              maxWidth: 360,
            }}
          >
            <ContactCard contact={c} adminEmail={adminEmail} />
          </div>
        ))}

        {listContacts.length === 0 && (
          <div style={{ fontSize: 14, color: "#64748b" }}>
            אין עדיין אנשי קשר בדף זה.
          </div>
        )}
      </div>
    </div>
  );
}

// --- מסך עריכת / הוספת איש קשר --- //

function EditContactView({
  contactLists,
  initialContact,
  onSave,
  onCancel,
}) {
  const isNew = !initialContact?.id;

  const [firstName, setFirstName] = useState(initialContact.firstName || "");
  const [lastName, setLastName] = useState(initialContact.lastName || "");
  const [role, setRole] = useState(initialContact.role || "");
  const [org, setOrg] = useState(initialContact.org || "");
  const [email, setEmail] = useState(initialContact.email || "");
  const [phone, setPhone] = useState(initialContact.phone || "");
  const [imageUrl, setImageUrl] = useState(initialContact.imageUrl || "");
  const [listIds, setListIds] = useState(initialContact.listIds || []);
  const [error, setError] = useState("");

  const toggleListId = (id) => {
    setListIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setImageUrl(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!firstName.trim() || !lastName.trim() || !role.trim() || !org.trim()) {
      setError("נא למלא את כל שדות החובה המסומנים בכוכבית.");
      return;
    }

    const data = {
      ...initialContact,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      role: role.trim(),
      org: org.trim(),
      email: email.trim(),
      phone: phone.trim(),
      imageUrl,
      listIds,
    };

    onSave(data);
  };

  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <div style={sectionTitleStyle}>
          {isNew ? "הוספת איש קשר חדש" : "עדכון פרטי איש קשר"}
        </div>
        <div style={sectionSubTitleStyle}>
          מלא את פרטי איש הקשר, העלה תמונה ושייך לדפי הקשר הרלוונטיים.
        </div>
      </div>

      {error && <div style={errorTextStyle}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 12,
            marginBottom: 16,
          }}
        >
          <div>
            <label style={{ fontSize: 13 }}>
              שם פרטי<span style={{ color: "red" }}> *</span>
            </label>
            <input
              style={textInputStyle}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label style={{ fontSize: 13 }}>
              שם משפחה<span style={{ color: "red" }}> *</span>
            </label>
            <input
              style={textInputStyle}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <label style={{ fontSize: 13 }}>
              תפקיד<span style={{ color: "red" }}> *</span>
            </label>
            <input
              style={textInputStyle}
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
          <div>
            <label style={{ fontSize: 13 }}>
              ארגון<span style={{ color: "red" }}> *</span>
            </label>
            <input
              style={textInputStyle}
              value={org}
              onChange={(e) => setOrg(e.target.value)}
            />
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 12,
            marginBottom: 16,
          }}
        >
          <div>
            <label style={{ fontSize: 13 }}>מייל</label>
            <input
              style={textInputStyle}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label style={{ fontSize: 13 }}>טלפון נייד</label>
            <input
              style={textInputStyle}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(240px, 320px) minmax(240px, 1fr)",
            gap: 16,
            marginBottom: 16,
          }}
        >
          <div>
            <label style={{ fontSize: 13, display: "block", marginBottom: 4 }}>
              תמונה
            </label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {imageUrl && (
              <div
                style={{
                  marginTop: 8,
                  width: "100%",
                  maxWidth: 260,
                  height: 180,
                  borderRadius: 12,
                  overflow: "hidden",
                  border: "1px solid #e2e8f0",
                }}
              >
                <img
                  src={imageUrl}
                  alt="תצוגה מקדימה"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}
          </div>

          <div>
            <label style={{ fontSize: 13, display: "block", marginBottom: 4 }}>
              שיוך לדפי קשר
            </label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {contactLists.map((list) => {
                const checked = listIds.includes(list.id);
                return (
                  <label
                    key={list.id}
                    style={{
                      borderRadius: 9999,
                      border: checked
                        ? "1px solid #2563eb"
                        : "1px solid #e2e8f0",
                      padding: "4px 10px",
                      fontSize: 13,
                      background: checked ? "#eff6ff" : "#ffffff",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleListId(list.id)}
                      style={{ marginLeft: 4 }}
                    />
                    {list.name}
                  </label>
                );
              })}
              {contactLists.length === 0 && (
                <div style={{ fontSize: 13, color: "#64748b" }}>
                  אין עדיין דפי קשר – צור דף קשר חדש במסך ניהול דפי קשר.
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 8,
            marginTop: 8,
          }}
        >
          <button type="button" style={pillButtonStyle} onClick={onCancel}>
            ביטול
          </button>
          <button
            type="submit"
            style={{
              ...pillButtonStyle,
              background: "#2563eb",
              color: "#ffffff",
              borderColor: "#1d4ed8",
            }}
          >
            שמירה
          </button>
        </div>
      </form>
    </div>
  );
}

// --- מסך ניהול אנשי קשר --- //

function ManageContactsView({
  contacts,
  onAddNew,
  onEdit,
  onDelete,
}) {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("name"); // name | role | org
  const [sortDir, setSortDir] = useState("asc");

  const sorted = useMemo(() => {
    const term = search.trim().toLowerCase();
    let filtered = contacts;

    if (term) {
      filtered = contacts.filter((c) => {
        const combined = [
          c.firstName,
          c.lastName,
          c.role,
          c.org,
          c.email,
          c.phone,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return combined.includes(term);
      });
    }

    const arr = [...filtered];

    arr.sort((a, b) => {
      let av = "";
      let bv = "";
      if (sortField === "name") {
        av = (a.lastName || "") + " " + (a.firstName || "");
        bv = (b.lastName || "") + " " + (b.firstName || "");
      } else if (sortField === "role") {
        av = a.role || "";
        bv = b.role || "";
      } else if (sortField === "org") {
        av = a.org || "";
        bv = b.org || "";
      }
      const base = av.localeCompare(bv, "he");
      return sortDir === "asc" ? base : -base;
    });

    return arr;
  }, [contacts, search, sortField, sortDir]);

  const handleSort = (field) => {
    setSortField((prevField) => {
      if (prevField === field) {
        setSortDir((prevDir) => (prevDir === "asc" ? "desc" : "asc"));
        return prevField;
      } else {
        setSortDir("asc");
        return field;
      }
    });
  };

  const renderSortIcon = (field) => {
    if (sortField !== field) return "↕";
    return sortDir === "asc" ? "↑" : "↓";
  };

  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <div style={sectionTitleStyle}>ניהול אנשי קשר</div>
        <div style={sectionSubTitleStyle}>
          עריכת רשימת אנשי הקשר, עדכון פרטים ושיוך לדפי קשר.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 12,
        }}
      >
        <div style={{ flex: 1, maxWidth: 360 }}>
          <input
            style={inputRoundedStyle}
            placeholder="חיפוש לפי שם, תפקיד, משרד..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          type="button"
          style={{
            ...smallIconButton,
            background: "#2563eb",
            color: "#ffffff",
          }}
          title="הוסף איש קשר חדש"
          onClick={onAddNew}
        >
          +
        </button>
      </div>

      <div
        style={{
          borderRadius: 12,
          border: "1px solid #e2e8f0",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 2fr 2fr auto",
            background: "#f8fafc",
            padding: "8px 12px",
            fontSize: 13,
            color: "#64748b",
          }}
        >
          <div>
            <button
              type="button"
              style={headerSortButtonStyle}
              onClick={() => handleSort("name")}
            >
              <span>שם</span>
              <span>{renderSortIcon("name")}</span>
            </button>
          </div>
          <div>
            <button
              type="button"
              style={headerSortButtonStyle}
              onClick={() => handleSort("role")}
            >
              <span>תפקיד</span>
              <span>{renderSortIcon("role")}</span>
            </button>
          </div>
          <div>
            <button
              type="button"
              style={headerSortButtonStyle}
              onClick={() => handleSort("org")}
            >
              <span>ארגון</span>
              <span>{renderSortIcon("org")}</span>
            </button>
          </div>
          <div style={{ textAlign: "left" }}>פעולות</div>
        </div>

        {sorted.map((c) => (
          <div
            key={c.id}
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 2fr 2fr auto",
              padding: "8px 12px",
              fontSize: 14,
              borderTop: "1px solid #e2e8f0",
              alignItems: "center",
            }}
          >
            <div>{`${c.firstName} ${c.lastName}`}</div>
            <div>{c.role}</div>
            <div>{c.org}</div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                gap: 6,
              }}
            >
              <button
                type="button"
                style={smallIconButton}
                title="עריכת איש קשר"
                onClick={() => onEdit(c)}
              >
                ✏️
              </button>
              <button
                type="button"
                style={smallIconButtonDanger}
                title="מחיקת איש קשר"
                onClick={() => onDelete(c)}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}

        {sorted.length === 0 && (
          <div style={{ padding: 12, fontSize: 14, color: "#64748b" }}>
            אין אנשי קשר תואמים לחיפוש.
          </div>
        )}
      </div>
    </div>
  );
}

// --- מסך ניהול דפי קשר --- //

function ManageContactListsView({ contactLists, onAdd, onEdit, onDelete }) {
  const [newName, setNewName] = useState("");

  const handleAdd = () => {
    const trimmed = newName.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setNewName("");
  };

  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <div style={sectionTitleStyle}>ניהול דפי קשר</div>
        <div style={sectionSubTitleStyle}>
          יצירה, עדכון והסרה של דפי קשר. אין מחיקה של אנשי קשר, רק הסרתם מדפי
          קשר.
        </div>
      </div>

      <div
        style={{
          borderRadius: 12,
          border: "1px solid #e2e8f0",
          overflow: "hidden",
          marginBottom: 12,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            background: "#f8fafc",
            padding: "8px 12px",
            fontSize: 13,
            color: "#64748b",
          }}
        >
          <div>שם דף קשר</div>
          <div style={{ textAlign: "left" }}>פעולות</div>
        </div>

        {contactLists.map((list) => (
          <div
            key={list.id}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              padding: "8px 12px",
              borderTop: "1px solid #e2e8f0",
              alignItems: "center",
            }}
          >
            <div>{list.name}</div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                gap: 6,
              }}
            >
              <button
                type="button"
                style={smallIconButton}
                title="עריכת דף קשר"
                onClick={() => onEdit(list)}
              >
                ✏️
              </button>
              <button
                type="button"
                style={smallIconButtonDanger}
                title="הסרת דף קשר"
                onClick={() => onDelete(list)}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}

        {contactLists.length === 0 && (
          <div style={{ padding: 12, fontSize: 14, color: "#64748b" }}>
            עדיין לא נוצרו דפי קשר.
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
        }}
      >
        <div style={{ flex: 1, maxWidth: 360 }}>
          <input
            style={inputRoundedStyle}
            placeholder="שם דף קשר חדש..."
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <button
          type="button"
          style={{
            ...smallIconButton,
            background: "#2563eb",
            color: "#ffffff",
          }}
          title="הוסף דף קשר"
          onClick={handleAdd}
        >
          +
        </button>
      </div>
    </div>
  );
}

// --- מסך הגדרות מערכת (מייל מנהל בלבד בשלב זה) --- //

function AppSettingsView({ adminEmail, setAdminEmail }) {
  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <div style={sectionTitleStyle}>הגדרות</div>
        <div style={sectionSubTitleStyle}>
          הגדרות כלליות של המערכת, לדוגמה מייל מנהל המערכת.
        </div>
      </div>

      <div
        style={{
          maxWidth: 420,
          borderRadius: 16,
          border: "1px solid #e2e8f0",
          padding: 16,
          background: "#f8fafc",
        }}
      >
        <div style={{ marginBottom: 8 }}>
          <label style={{ fontSize: 13, display: "block", marginBottom: 4 }}>
            מייל מנהל מערכת
          </label>
          <input
            style={inputRoundedStyle}
            placeholder="name@example.gov.il"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
          />
        </div>
        <div style={{ fontSize: 13, color: "#64748b" }}>
          כתובת זו תשמש כיעד לשליחת הצעות לעדכון כרטיסי קשר מדף הקשר (במכשיר
          המקומי שלך).
        </div>
      </div>
    </div>
  );
}

// --- מסך התחברות --- //

function LoginView({ onLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!username.trim() || !password.trim()) {
      setError("נא למלא שם משתמש וסיסמה.");
      return;
    }

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim(), password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "התחברות נכשלה.");
        return;
      }

      const data = await res.json();
      const token = data.token;

      if (!token) {
        setError("לא התקבל טוקן מהשרת.");
        return;
      }

      window.localStorage.setItem("authToken", token);
      setMessage("התחברת בהצלחה.");
      onLoggedIn(token);
    } catch (err) {
      console.error(err);
      setError("אירעה שגיאה בזמן ההתחברות.");
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <div style={sectionTitleStyle}>התחברות לממשק הניהול</div>
        <div style={sectionSubTitleStyle}>
          הזן שם משתמש וסיסמה שקיבלת כמנהל המערכת.
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: 360,
          borderRadius: 16,
          border: "1px solid #e2e8f0",
          padding: 16,
          background: "#f8fafc",
        }}
      >
        {error && <div style={errorTextStyle}>{error}</div>}
        {message && <div style={successTextStyle}>{message}</div>}

        <div style={{ marginBottom: 8 }}>
          <label style={{ fontSize: 13, display: "block", marginBottom: 4 }}>
            שם משתמש
          </label>
          <input
            style={inputRoundedStyle}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: 8 }}>
          <label style={{ fontSize: 13, display: "block", marginBottom: 4 }}>
            סיסמה
          </label>
          <input
            type="password"
            style={inputRoundedStyle}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 8,
          }}
        >
          <button
            type="submit"
            style={{
              ...pillButtonStyle,
              background: "#2563eb",
              color: "#ffffff",
              borderColor: "#1d4ed8",
            }}
          >
            התחברות
          </button>
        </div>
      </form>
    </div>
  );
}

// --- מסך מרכז ניהול --- //

function SettingsView({ onGoManageLists, onGoManageContacts, onGoAppSettings }) {
  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <div style={sectionTitleStyle}>ממשק ניהול</div>
        <div style={sectionSubTitleStyle}>
          ניהול דפי הקשר, אנשי הקשר והגדרות המערכת.
        </div>
      </div>

      <div style={tileGridStyle}>
        <div style={tileStyle} onClick={onGoManageLists}>
          <div>
            <div style={tileTitleStyle}>ניהול דפי קשר</div>
            <div style={tileSubTitleStyle}>
              יצירה, עדכון והסרה של דפי הקשר הקיימים.
            </div>
          </div>
        </div>

        <div style={tileStyle} onClick={onGoManageContacts}>
          <div>
            <div style={tileTitleStyle}>ניהול אנשי קשר</div>
            <div style={tileSubTitleStyle}>
              עריכה, הוספה ועדכון של אנשי הקשר במערכת.
            </div>
          </div>
        </div>

        <div style={tileStyle} onClick={onGoAppSettings}>
          <div>
            <div style={tileTitleStyle}>הגדרות</div>
            <div style={tileSubTitleStyle}>
              הגדרת מייל מנהל המערכת והגדרות כלליות נוספות.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- קבועי ניווט --- //

const VIEW_HOME = "home";
const VIEW_CONTACT_LIST = "contact-list";
const VIEW_LOGIN = "login";
const VIEW_SETTINGS = "settings";
const VIEW_MANAGE_LISTS = "manage-lists";
const VIEW_MANAGE_CONTACTS = "manage-contacts";
const VIEW_EDIT_CONTACT = "edit-contact";
const VIEW_APP_SETTINGS = "app-settings";

// --- אפליקציה ראשית --- //

export default function App() {
  const [contactLists, setContactLists] = useState(initialContactLists);
  const [contacts, setContacts] = useState(initialContacts);

  const [currentView, setCurrentView] = useState(VIEW_HOME);
  const [selectedListId, setSelectedListId] = useState(null);
  const [editingContact, setEditingContact] = useState(null);

  const [adminEmail, setAdminEmail] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        return window.localStorage.getItem("adminEmail") || "";
      } catch {
        return "";
      }
    }
    return "";
  });

  const [authToken, setAuthToken] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        return window.localStorage.getItem("authToken") || "";
      } catch {
        return "";
      }
    }
    return "";
  });

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem("adminEmail", adminEmail || "");
      }
    } catch {}
  }, [adminEmail]);

  const isLoggedIn = !!authToken;

  const goHome = () => {
    setCurrentView(VIEW_HOME);
    setSelectedListId(null);
    setEditingContact(null);
  };

  const goSettings = () => {
    setSelectedListId(null);
    setEditingContact(null);

    if (!isLoggedIn) {
      setCurrentView(VIEW_LOGIN);
    } else {
      setCurrentView(VIEW_SETTINGS);
    }
  };

  const handleSelectList = (id) => {
    setSelectedListId(id);
    setCurrentView(VIEW_CONTACT_LIST);
  };

  const handleAddList = (name) => {
    const id =
      name
        .toLowerCase()
        .replace(/[^\wא-ת]+/g, "-")
        .replace(/-+/g, "-") + "-" + Date.now().toString(36);

    setContactLists((prev) => [...prev, { id, name }]);
  };

  const handleEditList = (list) => {
    const newName = window.prompt("שם חדש לדף הקשר:", list.name);
    if (!newName || !newName.trim()) return;
    setContactLists((prev) =>
      prev.map((l) => (l.id === list.id ? { ...l, name: newName.trim() } : l))
    );
  };

  const handleDeleteList = (list) => {
    if (
      !window.confirm(
        `האם להסיר את דף הקשר "${list.name}"? לא ימחקו אנשי קשר, רק שיוכם לדף זה.`
      )
    ) {
      return;
    }
    setContactLists((prev) => prev.filter((l) => l.id !== list.id));
    setContacts((prev) =>
      prev.map((c) => ({
        ...c,
        listIds: (c.listIds || []).filter((id) => id !== list.id),
      }))
    );
    if (selectedListId === list.id) {
      setSelectedListId(null);
      setCurrentView(VIEW_HOME);
    }
  };

  const handleAddContact = () => {
    setEditingContact({
      id: null,
      firstName: "",
      lastName: "",
      role: "",
      org: "",
      email: "",
      phone: "",
      imageUrl: "",
      listIds: [],
    });
    setCurrentView(VIEW_EDIT_CONTACT);
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact);
    setCurrentView(VIEW_EDIT_CONTACT);
  };

  const handleDeleteContact = (contact) => {
    if (
      !window.confirm(
        `האם למחוק את איש הקשר "${contact.firstName} ${contact.lastName}"? פעולה זו אינה ניתנת לביטול.`
      )
    ) {
      return;
    }
    setContacts((prev) => prev.filter((c) => c.id !== contact.id));
  };

  const handleSaveContact = (contactData) => {
    if (contactData.id == null) {
      const newId =
        contacts.length === 0 ? 1 : Math.max(...contacts.map((c) => c.id)) + 1;
      const newContact = { ...contactData, id: newId };
      setContacts((prev) => [...prev, newContact]);
    } else {
      setContacts((prev) =>
        prev.map((c) => (c.id === contactData.id ? contactData : c))
      );
    }

    setCurrentView(VIEW_MANAGE_CONTACTS);
    setEditingContact(null);
  };

  const selectedList =
    currentView === VIEW_CONTACT_LIST && selectedListId
      ? contactLists.find((l) => l.id === selectedListId) || null
      : null;

  let content = null;

  if (currentView === VIEW_HOME) {
    content = (
      <HomeView contactLists={contactLists} onSelectList={handleSelectList} />
    );
  } else if (currentView === VIEW_CONTACT_LIST && selectedList) {
    content = (
      <ContactListView
        list={selectedList}
        contacts={contacts}
        adminEmail={adminEmail}
      />
    );
  } else if (currentView === VIEW_LOGIN) {
    content = (
      <LoginView
        onLoggedIn={(token) => {
          setAuthToken(token);
          setCurrentView(VIEW_SETTINGS);
        }}
      />
    );
  } else if (currentView === VIEW_SETTINGS) {
    content = (
      <SettingsView
        onGoManageLists={() => setCurrentView(VIEW_MANAGE_LISTS)}
        onGoManageContacts={() => setCurrentView(VIEW_MANAGE_CONTACTS)}
        onGoAppSettings={() => setCurrentView(VIEW_APP_SETTINGS)}
      />
    );
  } else if (currentView === VIEW_MANAGE_LISTS) {
    content = (
      <ManageContactListsView
        contactLists={contactLists}
        onAdd={handleAddList}
        onEdit={handleEditList}
        onDelete={handleDeleteList}
      />
    );
  } else if (currentView === VIEW_MANAGE_CONTACTS) {
    content = (
      <ManageContactsView
        contacts={contacts}
        onAddNew={handleAddContact}
        onEdit={handleEditContact}
        onDelete={handleDeleteContact}
      />
    );
  } else if (currentView === VIEW_EDIT_CONTACT && editingContact) {
    content = (
      <EditContactView
        contactLists={contactLists}
        initialContact={editingContact}
        onSave={handleSaveContact}
        onCancel={() => {
          setEditingContact(null);
          setCurrentView(VIEW_MANAGE_CONTACTS);
        }}
      />
    );
  } else if (currentView === VIEW_APP_SETTINGS) {
    content = (
      <AppSettingsView
        adminEmail={adminEmail}
        setAdminEmail={setAdminEmail}
      />
    );
  } else {
    content = (
      <div>
        <div style={sectionTitleStyle}>שגיאת ניווט</div>
        <div style={sectionSubTitleStyle}>
          לא נמצא המסך המבוקש. חזור למסך הבית.
        </div>
      </div>
    );
  }

  return (
    <div style={appContainerStyle}>
      <div style={shellStyle}>
        <TopHeader onHome={goHome} onSettings={goSettings} />
        {content}
        <div
          style={{
            marginTop: 24,
            fontSize: 11,
            color: "#94a3b8",
            textAlign: "center",
          }}
        >
          כל הזכויות שמורות למולי פלד
        </div>
      </div>
    </div>
  );
}
