import productStyle from "../../styles/Product.module.css";

export default function SizePicker({
    curSizes,
    allSizes,
    activeSize,
    changeSize
}) {
    const sizes = allSizes.map(as => ({
        ...as,
        isAvailable: curSizes.find(cs_id => cs_id === as.id)
    }));

    function handleClick(id) {
        if (id === activeSize) return;
        changeSize(id);
    }

    return (<div className={productStyle["sizePicker"]}>
        {
            sizes.map((s, i) => (<button
                onClick={() => handleClick(s.id)}
                key={`spb_${i}`}
                disabled={!s.isAvailable}
                className={activeSize === s.id ? productStyle["active"] : ""}
            >
                {s.label}
            </button>))
        }
    </div>
    )
}