using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class RegionsController : MonoBehaviour
{

    [SerializeField]
    private RegionScript regionClass;

    public void CreateRegion(Region regionData)
    {
        var newRegion = Instantiate(regionClass, new Vector3(regionData.point.x, regionData.point.y, 0), Quaternion.identity, gameObject.transform);
        newRegion.id = regionData.id;
        newRegion.name = regionData.name;
        newRegion.point = regionData.point;
        newRegion.neighbors = regionData.neighbors;
    }
}
