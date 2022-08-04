using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

public class RegionScript : MonoBehaviour
{
    public List<string> neighbors = new List<string>();
    public string id;
    public Point point;

    private TextMeshPro titleText;

    void Awake()
    {
        titleText = gameObject.GetComponentInChildren<TextMeshPro>();
    }

    // Start is called before the first frame update
    void Start()
    {
        titleText.text = gameObject.name;
    }
}
