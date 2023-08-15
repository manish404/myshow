import { useHall } from "@/hooks/hallHooks";
import Link from "next/link";

function HallCard({ hall, role }) {
    useHall(null, hall);
    const link = `/halls?id=${hall.id}` + (role ? `&user=${role}` : '');
    return (
        <li className="w-max hall-card mx-1">
            <Link href={link} className="row items-end row justify-between">
                <span className="capitalize">
                    {hall?.name}
                </span>
                <span className="text-xs capitalize row">
                    <i className="bi bi-geo-alt-fill text-xs text-white"></i>
                    &nbsp;
                    {hall?.cities?.name}
                </span>
            </Link>
        </li>
    )
}

export default HallCard;