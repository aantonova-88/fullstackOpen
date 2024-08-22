const CountryList = ({ list, onShowInfo }) => {
  return list.map((item) => (
    <div key={item.name.common}>
      {item.name.common}
      <button onClick={() => onShowInfo(item.name.common)}>show</button>
    </div>
  ));
};

export default CountryList;
