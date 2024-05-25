"use client"

import React, { useState } from 'react';

interface SpriteProps {
    name: string;
    imageUrl: string;
    description: string;
    onSelectSprite: (newSrc: string) => void;
}

const Sprite: React.FC<SpriteProps> = ({ name, imageUrl, description, onSelectSprite }) => {

    // с помощью этого надо будет потом менять стиль выбранного из меню спрайта
    const [selectedImage, setSelectedImage] = useState(null);
    //@ts-ignore

    const handleClick = (event) => {
        onSelectSprite(`${event.target.src}`); // предаём изображение наверх

        console.log(`Поставили выбранное изображение на ${event.target.src}`)
        // Если выбрано другое изображение, сбросить стиль
        if (selectedImage) {
            //@ts-ignore
            selectedImage.style.filter = "brightness(100%)";
        }

        // Установить выбранное изображение и применить стиль
        setSelectedImage(event.target);
        event.target.style.filter = "brightness(120%)";
    }

    return (
        <div className="sprite">
            <img src={imageUrl} alt={name}
                // не удалять отсюда эту функцю! она ответственна за перемещение спрайта!
                onClick={handleClick}
            />

            {/* Элемент с названием спрайта */}
            {/* комментарий: А НАХЕРА ЕМУ ИМЯ ОТОБРАЖАТЬ?! 
            ОНО ЗАНИМАЕТ ГОРАЗДО БЛЬШЕ МЕСТА НА ЭКРАНЕ, ЧЕМ САМ СПРАЙТ*/}
            <div className="sprite-name">{name}</div>
            <div className="sprite-info">
                <p>{description}</p>
            </div>
        </div>
    );
}

export default Sprite;