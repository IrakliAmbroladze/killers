export default function DoneAreas() {
  const areas = [
    "მიმღები",
    "სასტუმრო ოთახი",
    "სამზარეულო",
    "ოფისი",
    "დერეფანი",
    "რესტორანი",
    "ბარი",
    "ტერასა",
    "სველი წერტილები",
    "საწყობი",
    "საერთო სივრცე",
    "სხვენი",
    "სარდაფი",
    "მარანი",
    "ტექნიკური ოთახი",
    "საწარმო",
    "მომარაგების ოთახი",
    "ნაგავსაყრელი",
    "გარე ტერიტორია",
    "",
  ];
  return (
    <table className="text-sm">
      <thead>
        <tr>
          <th colSpan={5}>
            დეტალურად დათვალიერდა და საჭიროებისამებრ დამუშავდა შემდეგი
            სივრცეები:
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          {areas.slice(0, 5).map((area) => (
            <td key={area}>{area}</td>
          ))}
        </tr>
        <tr>
          {areas.slice(5, 10).map((area) => (
            <td key={area}>{area}</td>
          ))}
        </tr>
        <tr>
          {areas.slice(10, 15).map((area) => (
            <td key={area}>{area}</td>
          ))}
        </tr>
        <tr>
          {areas.slice(15, 20).map((area) => (
            <td key={area}>{area}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}
