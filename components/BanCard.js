const { default: Image } = require("next/image");

export function BanCard () {
    return (
        <div className={'w-8 h-8 bg-[#2E2E2E] drop-shadow-xl'}>
            <Image
                src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/-1.png`}
                width={100}
                height={100}
                alt='ban'
                className="object-contain"
            />
        </div>
    )
}