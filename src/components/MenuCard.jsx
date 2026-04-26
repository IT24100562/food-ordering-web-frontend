import { Link } from "react-router-dom";

function MenuCard({ item }) {
  return (
    <article className="menu-card">
      <img src={item.image} alt={item.name} className="menu-card-img" loading="lazy" />
      <div className="menu-card-body">
        <div className="menu-card-meta">
          <span>{item.category}</span>
          <span>{item.prepTime}</span>
        </div>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <div className="menu-card-footer">
          <strong>LKR {item.price.toLocaleString()}</strong>
          <Link to={`/menu/${item.id}`} className="btn-inline">
            View Dish
          </Link>
        </div>
      </div>
    </article>
  );
}

export default MenuCard;
