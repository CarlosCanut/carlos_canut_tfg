import * as React from "react"
import Image from "next/image"

export function SelectRole({ role }) {
    var selectedRole = ""
    switch (role) {
        case 'mid':
            selectedRole = 'middle'
            break;
        case 'general':
            selectedRole = 'unselected'
            break;
        default:
            selectedRole = role
            break;
    }
  return (
    <div className='self-end px-1'>
        <div className={'w-6 h-6'}>
            <Image
                src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-${selectedRole}.png`}
                width={100}
                height={100}
                alt='ban'
                className="object-contain"
            />
        </div>
    </div>
  )
}
