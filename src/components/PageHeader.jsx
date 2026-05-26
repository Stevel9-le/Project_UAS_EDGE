export default function PageHeader({
  title = "Dashboard",
  breadcrumb = ["Dashboard", "Order List"],
  buttonText = "Booking PC",
  onButtonClick,
  children,
}) {

  const list = Array.isArray(breadcrumb)
    ? breadcrumb
    : [breadcrumb];

  return (
    <div
      id="pageheader-container"
      className="flex items-center justify-between p-4"
    >

      {/* LEFT SECTION */}
      <div
        id="pageheader-left"
        className="flex flex-col"
      >

        {/* TITLE */}
        <span
          id="page-title"
          className="text-4xl font-bold text-[#151D48]"
        >
          {title}
        </span>

        {/* BREADCRUMB */}
        <div
          id="breadcrumb-links"
          className="flex items-center font-medium space-x-2 mt-2"
        >
          {list.map((item, index) => (
            <div
              key={index}
              className="flex items-center space-x-2"
            >
              <span className="text-gray-400 text-sm">
                {item}
              </span>

              {index !== list.length - 1 && (
                <span className="text-gray-400 text-sm">
                  /
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div id="action-button">

        {buttonText && (
          <button
            id="add-button"
            onClick={onButtonClick}
            className="bg-blue-500 hover:bg-blue-600 transition text-white px-6 py-3 rounded-xl font-semibold"
          >
            {buttonText}
          </button>
        )}

        {children}

      </div>
    </div>
  );
}