import React from 'react';
import Group from './Group';

interface SpriteMenuProps {
    groups: { title: string; sprites: Sprite[] }[];
}

const SpriteMenu: React.FC<SpriteMenuProps> = ({ groups }) => {
    return (
        <div className="sprite-menu">
            {groups.map((group, index) => (
                <Group key={index} title={group.title} sprites={group.sprites} />
            ))}
        </div>
    );
}

export default SpriteMenu;