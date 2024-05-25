import React from 'react';
import Group from './Group';

interface SpriteMenuProps {
    groups: {
        title: string;
        //@ts-ignore
        sprites: Sprite[];
    }[];
    onSelectSprite: (newSrc: string) => void;
}

const SpriteMenu: React.FC<SpriteMenuProps> = ({ groups, onSelectSprite }) => {
    return (
        <div className="sprite-menu">
            {groups.map((group, index) => (
                <Group
                    key={index}
                    title={group.title}
                    sprites={group.sprites}
                    onSelectSprite={onSelectSprite} />
            ))}
        </div>
    );
}

export default SpriteMenu;