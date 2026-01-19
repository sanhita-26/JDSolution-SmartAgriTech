const SuccessScreen = ({ crop, qty, unit, t }) => {
  return (
    <div className="text-center px-5 py-16">
      {/* CHECK ICON */}
      <div className="text-[48px] text-green-700 mb-5">✔</div>

      {/* TITLE */}
      <h2 className="text-2xl font-bold mb-3">
        {t.successTitle}
      </h2>

      {/* MESSAGE */}
      <p className="text-gray-700 text-lg mb-2">
        {t.successLine1}{" "}
        <strong>{qty} {unit}</strong> {t.successLine2}{" "}
        <strong>{crop}</strong> {t.successLine3}
      </p>

      <span className="text-gray-500">{t.redirecting}</span>
    </div>
  );
};

export default SuccessScreen;
