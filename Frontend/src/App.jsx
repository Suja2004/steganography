import EncodeForm from "./components/EncodeForm";
import DecodeForm from "./components/DecodeForm";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">🕵️ SecretPixels</h1>
      <div className="flex flex-col gap-6 w-full max-w-4xl">
        <EncodeForm />
        <DecodeForm />
      </div>
    </div>
  );
}
