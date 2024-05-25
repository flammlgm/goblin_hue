import React from 'react';
import Group from './Group';
import { ScrollArea } from '@/components/ui/scroll-area';

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
        <ScrollArea className='h-[100%] w-[100%] px-8  border-2 border-gold'>
            <div className="sprite-menu">
                {groups.map((group, index) => (
                    <Group
                        key={index}
                        title={group.title}
                        sprites={group.sprites}
                        onSelectSprite={onSelectSprite} />
                ))}
            </div>

        </ScrollArea>

    );
}

export default SpriteMenu;