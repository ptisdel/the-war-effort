using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class RegionsScript : MonoBehaviour
{

    [SerializeField]
    private GameObject region;

    string[] names = {
        "Poop",
        "in",
        "a",
        "bucket",
    };

    public void CreateRegion() {
        var newRegion = Instantiate(region, gameObject.transform);
        string randomName = names[Random.Range(0, names.Length)];
        newRegion.name = randomName;
    }
}
