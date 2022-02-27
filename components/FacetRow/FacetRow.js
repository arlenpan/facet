import FacetSlot from "components/FacetSlot";
import { FACET_STATE_FAILURE, FACET_STATE_SUCCESS } from "lib/consts";

export default function FacetRow({ slots = Array(6).fill(null), type, onFacet }) {
    const handleClickFacet = (e) => {
        const value = e.target.value;
        onFacet(value);
    };

    return (
        <div className="d-flex-center">
            <div>Image</div>
            <div className="d-flex-column">
                <div>Title</div>
                <div className="d-flex-center">
                    {slots.map((s, i) => (
                        <FacetSlot value={s} type={type} key={i} />
                    ))}
                </div>
            </div>
            <div>
                <button type="button" value={FACET_STATE_SUCCESS} onClick={handleClickFacet}>
                    Success
                </button>
                <button type="button" value={FACET_STATE_FAILURE} onClick={handleClickFacet}>
                    Fail
                </button>
                <button type="button" value="random" onClick={handleClickFacet}>
                    Random
                </button>
            </div>
        </div>
    );
}
