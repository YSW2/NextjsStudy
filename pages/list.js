export default function List() {
  let foods = ["Tomatoes", "Pasta", "Coconut"];

  return (
    <div>
      <h4 className="title">상품 리스트</h4>
      {foods.map((food, i) => (
        <div className="food" key={i}>
          <img src={`image${i}.png`} className="food-img" />
          <h4>{food} $40</h4>
        </div>
      ))}
    </div>
  );
}
