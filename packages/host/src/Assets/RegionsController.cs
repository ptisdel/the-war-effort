using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class RegionsController : MonoBehaviour
{

    [SerializeField]
    private RegionScript region;

    private readonly string[] _names = {
        "Poop",
        "in",
        "a",
        "bucket",
    };

    public void CreateRegion() {
        var newRegion = Instantiate(region, gameObject.transform);
        var randomName = _names[Random.Range(0, _names.Length)];
        newRegion.name = randomName;
    }
}
