function CategoryPills({ categories, activeCategory, onChange }) {
  return (
    <div className="pill-row">
      {["All", ...categories].map((category) => (
        <button
          type="button"
          key={category}
          className={category === activeCategory ? "pill active" : "pill"}
          onClick={() => onChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryPills;
