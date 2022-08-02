using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

public class RegionScript : MonoBehaviour
{
    [SerializeField]
    private TextMeshPro textMeshPro;
    
    // Start is called before the first frame update
    void Start()
    {
        textMeshPro.text = gameObject.name;
    }
}
