import classNames from "classnames";
import { Diamond } from "components/Icons";
import styles from "./FacetSlot.module.scss";

// value: true for filled, false for fail, null for unfaceted
export default function FacetSlot({ value, type }) {
    return (
        <Diamond
            className={classNames(
                styles["facet-slot"],
                styles[type],
                value === true && styles["success"],
                value === false && styles["failure"]
            )}
        />
    );
}
