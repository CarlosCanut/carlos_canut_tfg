import Image from "next/image";

export function DraftCard({ dimensions='w-8 h-8', rotation, index, champLocked, champSelected }) {
    const active = rotation === index;
  
    return (
      <div
        className={`${dimensions} bg-[#2E2E2E] drop-shadow-xl${active ? ' border border-white border-opacity-50' : ''}`}
      >
        {active && champSelected && (
          <Image
            src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${champSelected}.png`}
            width={100}
            height={100}
            alt={champSelected}
            className="object-contain"
          />
        )}
  
        {!active && rotation > index && (
          <Image
            src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${champLocked}.png`}
            width={100}
            height={100}
            alt={champLocked}
            className="object-contain"
          />
        )}
      </div>
    );
  }