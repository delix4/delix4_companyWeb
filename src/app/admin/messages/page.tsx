import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

type Msg = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  createdAt: string;
};

export default function MessagesPage() {
  const filePath = path.join(process.cwd(), "data", "contact-messages.json");
  const raw = fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "[]";
  const messages: Msg[] = raw ? JSON.parse(raw) : [];

  return (
    <main className="d4-container py-10">
      <h1 className="text-2xl font-extrabold">Contact Messages</h1>
      <p className="mt-2 text-white/70 text-sm">
        Stored locally in <code className="text-white/90">data/contact-messages.json</code>
      </p>

      <div className="mt-6 grid gap-4">
        {messages.length === 0 ? (
          <div className="d4-card p-6 text-white/70">No messages yet.</div>
        ) : (
          messages.map((m) => (
            <div key={m.id} className="d4-card p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="font-semibold">
                  {m.firstName} {m.lastName}
                </div>
                <div className="text-xs text-white/55">
                  {new Date(m.createdAt).toLocaleString()}
                </div>
              </div>
              <div className="mt-2 text-sm text-white/70">
                <span className="text-white/80">Email:</span> {m.email}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/80">
                {m.message}
              </p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
