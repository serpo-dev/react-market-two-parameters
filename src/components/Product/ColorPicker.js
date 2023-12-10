import productStyle from "../../styles/Product.module.css";

export default function ColorPicker({
    colors,
    activeColor,
    changeColor
}) {
    function handleClick(id) {
        if (activeColor === id) return;
        changeColor(id);
    }

    return (<div className={productStyle["colorPicker"]}>
        {
            colors.map((c, i) => (<button
                onClick={() => handleClick(c.id)}
                key={`cpb_${i}`}
                disabled={!Boolean(c.sizes.length)}
                className={activeColor === c.id ? productStyle["active"] : ""}
            >
                {c.name}
            </button>))
        }
    </div>
    )
}