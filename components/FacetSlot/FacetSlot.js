import classNames from "classnames";
import { Diamond } from "components/Icons";
import { FACET_STATE_FAILURE, FACET_STATE_SUCCESS } from "lib/consts";
import styles from "./FacetSlot.module.scss";

// value: true for filled, false for fail, null for unfaceted
export default function FacetSlot({ value }) {
    return (
        <Diamond
            className={classNames(
                styles["facet-slot"],
                value === true && styles["success"],
                value === false && styles["failure"]
            )}
        />
    );
}
