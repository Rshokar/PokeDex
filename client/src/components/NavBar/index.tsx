import React, { ReactNode } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import style from "./style";


export interface NavButtonProps { label: String, icon: ReactNode, onClick?: Function }

interface BottomNavProps {
    buttons: NavButtonProps[];
}

const { wrapper, button } = style;

export default function BottomNav({ buttons }: BottomNavProps) {

    return (
        <BottomNavigation style={wrapper}>
            {buttons.map((button: NavButtonProps, index: number) => {
                const { icon, label, onClick } = button;
                return (
                    <BottomNavigationAction
                        key={index}
                        icon={icon}
                        label={label}
                        onClick={(e) => onClick ? onClick() : () => { }}
                    />
                );
            })}
        </BottomNavigation>
    );
}

