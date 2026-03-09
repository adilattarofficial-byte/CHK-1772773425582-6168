export default function Header() {
  return (
    <div className="flex items-center justify-between p-5 border-b bg-white">

      <h2 className="font-semibold text-gray-800">
        Academic Assistant AI
      </h2>

      <div className="flex items-center gap-4">

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          AI Online
        </div>

        <div className="w-8 h-8 rounded-full bg-indigo-200 flex items-center justify-center text-sm font-semibold">
          JD
        </div>

      </div>

    </div>
  );
}