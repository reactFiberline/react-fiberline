function getTag(tag) {
    switch(tag) {
        case 0:
            return 'Indeterminate Component';
        case 1:
            return 'Functional Component';
        case 2:
            return 'Class Component';
        case 3:
            return 'Host Root';
        case 4:
            return 'Host Portal';
        case 5:
            return 'Host Component';
        case 6:
            return 'Host Text';
        case 7:
            return 'Call Component';
        case 8:
            return 'Call Handler Phase';
        case 9:
            return 'Return Component';
        case 10:
            return 'Fragment';
        case 11:
            return 'Mode';
        case 12:
            return 'Context Consumer';
        case 13:
            return 'Context Provider';
        case 14:
            return 'Loading Component';
        case 15:
            return 'Timeout Component';
        default:
            return 'unknown';
    }
}

function getEffectTag(effectTag) {

    const map = {
        1: 'PerformedWork',
        2: 'Placement',
        4: 'Update',
        5: 'PlacementAndUpdate',
        8: 'Deletion',
        16: 'ContentReset',
        32: 'Callback',
        64: 'DidCapture',
        128: 'Ref',
        256: 'ErrLog',
        512: 'Incomplete',
        1024: 'ShouldCapture',
        2048: 'Snapshot',
        2559: 'HostEffectMask'
    }

    const keys = Object.keys(map);
    let result = '';
    let i = keys.length;

    if (effectTag === 0) return 'NoEffect';
    
    while (effectTag) {
        if (keys[--i] <= effectTag) {
            result += map[keys[i]] + ', ';
            effectTag -= keys[i];
        }
    }
    return result.slice(0, -2)
}

// function calculateFiberlineIndex(log) {
//     result = {};
//     currentStack = [];
//     log.forEach(x => {
//         if ()
//     });
// }

export default function reduceHook(hook) {
    return hook.reduce((a, b) => {

        if (!b.fiber._debugID) return a;

        if (!a[b.fiber._debugID]){
            a[b.fiber._debugID] = [];
        }

        // if (!a[b.fiber._debugID][b.evt]) a[b.fiber._debugID][b.evt] = [];
        a[b.fiber._debugID].push({
            'time': b.time,
            'eventName': b.evt,
            'child': b.fiber.child,
            'effectTag': b.fiber.effectTag,
            'effectTagEnglish': getEffectTag(b.fiber.effectTag),
            'expirationTime': b.fiber.expirationTime,
            'firstEffect': b.fiber.firstEffect,
            'lastEffect': b.fiber.lastEffect,
            'memoizedProps': b.fiber.memoizedProps,
            'memoizedState': b.fiber.memoizedState,
            'mode': b.fiber.mode,
            'nextEffect': b.fiber.nextEffect,
            'pendingProps': b.fiber.pendingProps,
            'ref': b.fiber.ref,
            'sibling': b.fiber.sibling,
            'stateNode': b.fiber.stateNode,
            'tag': getTag(b.fiber.tag),
            'type': b.fiber.type,
            'updateQueue': b.fiber.updateQueue
        })

        return a;

    }, {})
}
