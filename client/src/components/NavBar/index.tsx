import React, { ReactNode } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import style from "./style";


export interface NavButtonProps { label: String, icon: ReactNode }

interface BottomNavProps {
    buttons: NavButtonProps[];
}

const { wrapper, button } = style;

export default function BottomNav({ buttons }: BottomNavProps) {

    return (
        <BottomNavigation style={wrapper}>
            {buttons.map((button: NavButtonProps, index: number) => {
                const { icon, label } = button;
                return (
                    <BottomNavigationAction
                        key={index}
                        icon={icon}
                        label={label}
                    />
                );
            })}
        </BottomNavigation>
    );
}

