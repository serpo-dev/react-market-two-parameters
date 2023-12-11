import { useCallback, useState } from "react";
import productStyle from "../../styles/Product.module.css";
import Prev from "../../assets/left.svg";
import Next from "../../assets/right.svg";

export default function Gallery({ images, alt }) {
    const [count, setCount] = useState(0);

    const handlePrev = useCallback(() => {
        setCount((prevCount) =>
            prevCount > 0
                ? prevCount - 1
                : 0
        );
    }, []);

    const handleNext = useCallback(() => {
        setCount((prevCount) =>
            prevCount < images.length - 1
                ? prevCount + 1
                : images.length - 1
        );
    }, [images]);

    const handlePreviewCLick = useCallback((index) => {
        setCount(index);
    }, []);

    return (<>
        <div className={productStyle["gallery"]}>
            <div
                className={productStyle["full"]}
            >
                <img
                    src={images[count]}
                    alt={`${alt}`}
                />
                <div className={productStyle["navigation"]}>
                    <img
                        onClick={handlePrev}
                        src={Prev}
                        alt="prev"
                    />
                    <img
                        onClick={handleNext}
                        src={Next}
                        alt="next"
                    />
                </div>
            </div>

            <div className={productStyle["preview"]}>
                {
                    images.map((image, index) => (
                        <img
                            onClick={() => handlePreviewCLick(index)}
                            src={image}
                            key={image}
                            alt={`${alt}+${image}`}
                        />
                    ))
                }
            </div>
        </div>
    </>)
}