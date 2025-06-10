import { UserRole } from "./types/use-role";
import { FaUserAlt } from "react-icons/fa";
import { HiScissors } from "react-icons/hi2";
import { TbCalendarSearch, TbMoneybag } from "react-icons/tb";
import { AiFillHome } from "react-icons/ai";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { BiBuildings } from "react-icons/bi";
import { AppRoutes } from "./routes";
import { FaBell } from "react-icons/fa";

export interface MenuItem {
    label: string;
    icon: JSX.Element;
    to: string;
    role?: UserRole[];
}

export interface MenuLabel {
    label: string;
    role?: UserRole[];
}

export interface MenuSection {
    label: MenuLabel[];
    items: MenuItem[];
}



export const menuSection: MenuSection[] = [ 
    {
        label: [
            {
                label: 'Administración',
                role: [UserRole.ADMIN, UserRole.BARBER]
            }
        ],
        items: [
            
            {
                label: "Home ",
                icon: <AiFillHome />,
                to: AppRoutes.home.route()
            },
            
          
            {
                label: "Usuarios",
                icon: <FaUserAlt />, 
                to: AppRoutes.userListAdmin.route(),
                role: [UserRole.ADMIN]
            },
            {
                label: "Barberos",
                icon: <HiScissors />, 
                to: AppRoutes.barberListAdmin.route(),
                role: [UserRole.ADMIN]
            },
            {
                label: "Sucursales",
                icon: <BiBuildings />,
                to: AppRoutes.branchListAdmin.route(),
                role: [UserRole.ADMIN]
            },
            {
                label: "Productos",
                icon: <MdOutlineProductionQuantityLimits />,
                to: "",
                role: [UserRole.ADMIN]
            },
              {
                label: 'Notificaciones',
                icon: <FaBell />,
                to: "",
                role: [UserRole.ADMIN, UserRole.BARBER]
            }
        ]
    },
    {
        label: [
            
            {
                label: 'Planificación',
                role: [UserRole.ADMIN, UserRole.BARBER]
            }
        ],
        items: [ 
            {
                label: "Turnos",
                icon: <TbCalendarSearch />,
                to: AppRoutes.Appointment.route(),
                role: [UserRole.ADMIN, UserRole.BARBER]
            },
            {
                label: "Ganancias",
                icon: <TbMoneybag />, 
                to: AppRoutes.ProfitHome.route(),
                role: [UserRole.ADMIN]
            }
            
        ]
    }
];