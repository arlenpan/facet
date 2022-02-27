import FacetSlot from "components/FacetSlot";

export default function FacetRow({ slots = Array(6).fill(null), onClickSlot }) {
    return (
        <div className="d-flex-center">
            <div>Image</div>
            <div className="d-flex-column">
                <div>Title</div>
                <div className="d-flex-center">
                    {slots.map((s, i) => (
                        <FacetSlot value={s} key={i} />
                    ))}
                </div>
            </div>
        </div>
    );
}
