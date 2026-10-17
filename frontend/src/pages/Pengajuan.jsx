import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/forms/Input.jsx";
import Select from "../components/forms/Select.jsx";
import Textarea from "../components/forms/Textarea.jsx";

export default function Pengajuan() {
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function validate(data) {
    const e = {};
    if (!data.get("nama")) e.nama = "Nama wajib diisi";
    if (!data.get("email")) e.email = "Email wajib diisi";
    if (!data.get("instansi")) e.instansi = "Instansi wajib diisi";
    if (!data.get("judul")) e.judul = "Judul wajib diisi";
    if (!data.get("tipe")) e.tipe = "Tipe pengajuan wajib dipilih";
    return e;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    setStatus(null);
    const data = new FormData(ev.target);
    const validation = validate(data);
    if (Object.keys(validation).length) {
      setErrors(validation);
      return;
    }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setStatus("success");
    ev.target.reset();
  }

  return (
    <>
      <section className="border-b border-line bg-white py-10">
        <div className="mx-auto max-w-container px-4 md:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-3 text-xs text-ink-500">
            <ol className="flex items-center gap-1">
              <li><a href="/" className="hover:text-orange-500">Beranda</a></li>
              <li aria-hidden="true">/</li>
              <li className="font-semibold text-ink-700">Pengajuan</li>
            </ol>
          </nav>
          <h1 className="text-3xl font-extrabold text-navy-800 md:text-4xl">Form Pengajuan</h1>
          <p className="mt-2 max-w-2xl text-sm text-ink-500 md:text-base">
            Ajukan proposal penelitian, pengabdian masyarakat, atau layanan HKI melalui form berikut.
          </p>
        </div>
      </section>

      <section className="bg-canvas py-10">
        <div className="mx-auto max-w-container px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl rounded-lg border border-line bg-surface p-6 shadow-card md:p-10">
            {status === "success" && (
              <div className="mb-6 rounded-md border border-teal-600 bg-teal-50 p-4 text-sm text-teal-700" role="alert">
                Pengajuan berhasil dikirim. Tim LPPM akan menghubungi Anda melalui email untuk langkah selanjutnya.
              </div>
            )}
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Input id="nama" name="nama" label="Nama Lengkap *" placeholder="Nama lengkap Anda" error={errors.nama} />
                <Input id="email" name="email" type="email" label="Email Aktif *" placeholder="nama@domain.com" error={errors.email} />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Input id="instansi" name="instansi" label="Asal Instansi *" placeholder="Universitas/ organisasi" error={errors.instansi} />
                <Select id="tipe" name="tipe" label="Tipe Pengajuan *" error={errors.tipe}>
                  <option value="">Pilih tipe</option>
                  <option value="penelitian">Hibah Penelitian</option>
                  <option value="pengabdian">Pengabdian Masyarakat</option>
                  <option value="hki">Pendaftaran HKI</option>
                  <option value="konsultasi">Konsultasi Publikasi</option>
                </Select>
              </div>
              <Input id="judul" name="judul" label="Judul Proposal *" placeholder="Judul proposal atau inovasi" error={errors.judul} />
              <Textarea id="deskripsi" name="deskripsi" label="Ringkasan/ Deskripsi Singkat" helper="Min. 50 karakter" />
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center rounded-md bg-orange-500 px-6 py-3 text-sm font-bold text-white hover:bg-orange-600 disabled:bg-orange-200"
                >
                  {loading ? "Mengirim..." : "Kirim Pengajuan"}
                </button>
                <Link to="/" className="text-sm font-semibold text-ink-500 hover:text-navy-800">
                  Batal
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
