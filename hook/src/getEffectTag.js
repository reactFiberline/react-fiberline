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
