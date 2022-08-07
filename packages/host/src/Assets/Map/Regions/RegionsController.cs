using System.Collections.Generic;
using UnityEngine;

namespace Map.Regions
{
    public class RegionsController : MonoBehaviour
    {
        [SerializeField]
        private RegionScript regionClass;

        public void CreateRegion()
        {
            Region _defaultRegion = new Region("0", "A", new Point(-1, 2), new List<string>() { "1", "2" });
            CreateRegion(_defaultRegion);
        }

        public void CreateRegion(Region regionData)
        {
            var newRegion = Instantiate(regionClass, new Vector3(regionData.point.x, regionData.point.y, 0), Quaternion.identity, gameObject.transform);
            newRegion.id = regionData.id;
            newRegion.name = regionData.name;
            newRegion.point = regionData.point;
            newRegion.neighbors = regionData.neighbors;
        }
    }

}

