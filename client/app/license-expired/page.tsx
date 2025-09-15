export default function LicenseExpiredPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-red-50">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-red-600">🚫 License Expired</h1>
        <p className="mt-2 text-gray-700">
          Your subscription/license has expired. Please renew your license to
          regain access.
        </p>
      </div>
    </div>
  );
}
