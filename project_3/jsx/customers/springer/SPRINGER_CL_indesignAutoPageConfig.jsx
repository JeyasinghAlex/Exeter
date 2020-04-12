var config = {
    "defaultUnits":"pt",
    "baseLeading":13,
    "preferredPlaceColumn":0,
    "baseAlignmentItterationLimit":3,
    "floatLandscape":false,
    "pageCountDetails":"Rounded",
    "floatOnFirstPageForDefaultLayout":true,
    "landscapeFloatOnFirstPage":false,
    "articleTypeNotFloatsOnFirstPage":["undefined","DEFAULT"
    ],
    "floatTypeOnFirstPage":"KEY,KEY_BACK",
    "tableColumnHeadSpanRule":false,
    "minStackSpace":18,
    "placeStyle":"Sandwich",
    "figCaptionMinLines": 0,
    "minNoLinesOnPag":3,
    "applyTableLeftRightBorder":true,
    "applyTableBorderWidth":0.15,
    "applyTableBorderColor":'WHITE',
    "pageSize":{
        "width":612,
        "height":792
    },
    "exportPDFpreset":{
        "print":{
            "crop_marks":true, 
            "bleed_marks":false, 
            "registration_marks":true, 
            "colour_bars":false, 
            "page_information":false,
            "offset":8.504
            },
        "online":{
            "crop_marks":false, 
            "bleed_marks":false, 
            "registration_marks":false, 
            "colour_bars":false, 
            "page_information":false,
            "offset":0
            }
        },
    "wrapAroundFloat":{
      "top":18,
      "bottom":18,
      "left":12.5,
      "right":12.5,
      "gutter":12.5
    },
    "geoBoundsVerso":[54,36,738,531
    ],
    "geoBoundsRecto":[54,693,738,1188
    ],
    "articleTypeDetails":{
    "undefined":"LAYOUT1",
    "DEFAULT":"LAYOUT1",
    "COMMENTARY":"LAYOUT1",
    "LRTOTEER":"LAYOUT5",
    "EDITORIAL":"LAYOUT4",
    "BKRW":"LAYOUT2",
    "CNCR":"LAYOUT3",
    "MISCELLANEOUS":"LAYOUT2",
    "THANK":"LAYOUT3"
    },
    "pageColumnDetails":{
        "LAYOUT1":{        
            "openerPageColumnDetails":[
                  {"width":241.5, "height":623,"floatsCited":false,"gutter":0},
                  {"width":241.5, "height":623,"floatsCited":false,"gutter":12}
                ],
                "columnDetails":[
                  {"width":241.5, "height":684,"floatsCited":false,"gutter":0},
                  {"width":241.5, "height":684,"floatsCited":false,"gutter":12}
                ],
                "openerPageMargin":{
                 "top":116,
                "bottom":54,
                "inside":81,
                "outside":36
                },
            "otherPageMargin":{
                 "top":54,
                "bottom":54,
                "inside":81,
                "outside":36
                }
            },
         "LAYOUT2":{
              "openerPageColumnDetails":[
                  {"width":241.5, "height":468,"floatsCited":false,"gutter":0},
                  {"width":241.5, "height":468,"floatsCited":false,"gutter":12}
                ],
                "columnDetails":[
                  {"width":241.5, "height":684,"floatsCited":false,"gutter":0},
                  {"width":241.5, "height":684,"floatsCited":false,"gutter":12}
                ],
                "openerPageMargin":{
                 "top":54,
                "bottom":54,
                "inside":81,
                "outside":36
                },
            "otherPageMargin":{
                 "top":54,
                "bottom":54,
                "inside":81,
                "outside":36
                }
            },
         "LAYOUT3":{
                 "openerPageColumnDetails":[
                  {"width":241.5, "height":646.3,"floatsCited":false,"gutter":0},
                  {"width":241.5, "height":646.3,"floatsCited":false,"gutter":12}
                ],
                "columnDetails":[
                  {"width":241.5, "height":684,"floatsCited":false,"gutter":0},
                  {"width":241.5, "height":684,"floatsCited":false,"gutter":12}
                ],
                "openerPageMargin":{
                 "top":116,
                "bottom":54,
                "inside":81,
                "outside":36
                },
            "otherPageMargin":{
                 "top":54,
                "bottom":54,
                "inside":81,
                "outside":36
                }
             },
         "LAYOUT4":{
                 "openerPageColumnDetails":[
                  {"width":241.5, "height":641.95,"floatsCited":false,"gutter":0},
                  {"width":241.5, "height":641.95,"floatsCited":false,"gutter":12}
                ],
                "columnDetails":[
                  {"width":241.5, "height":684,"floatsCited":false,"gutter":0},
                  {"width":241.5, "height":684,"floatsCited":false,"gutter":12}
                ],
                "openerPageMargin":{
                 "top":116,
                "bottom":54,
                "inside":81,
                "outside":36
                },
            "otherPageMargin":{
                 "top":54,
                "bottom":54,
                "inside":81,
                "outside":36
                }
             },
         "LAYOUT5":{        
            "openerPageColumnDetails":[
                  {"width":241.5, "height":610,"floatsCited":false,"gutter":0},
                  {"width":241.5, "height":610,"floatsCited":false,"gutter":12}
                ],
                "columnDetails":[
                  {"width":241.5, "height":684,"floatsCited":false,"gutter":0},
                  {"width":241.5, "height":684,"floatsCited":false,"gutter":12}
                ],
                "openerPageMargin":{
                 "top":129,
                "bottom":54,
                "inside":81,
                "outside":36
                },
            "otherPageMargin":{
                 "top":54,
                "bottom":54,
                "inside":81,
                "outside":36
                }
            }
        },
    "jrnlBoxBlock":{//these objects are for overriding actual floats placement 
        "KEY":{
            "calcCitationHeight":false,
            "preferredOnCurrentPage":true,
            "preferredOnColumn":1,
            "preferredPlacement":'top'
        },
        "KEY_BACK":{
            "calcCitationHeight":false,
            "preferredOnCurrentPage":true,
            "preferredOnColumn":0,
            "preferredPlacement":null
        }
    },
    "landscape":{
      "singleColumnStyle":true,//if this is true then the landscape float could be placed in landscape single column
      "twoThirdColumnStyle":false,//if this is true then the landscape float could be placed in landscape two third column
      "twoThirdWidth":340.85, 
      "horizontalCenter":true//if this is true float could be center horizontally after rotated
    },
    "resizeImage":{
      "allow":false,
      "modifyLimit":0
    },
    "figCaption":{
      "position":"bottom",
      "sideCaption":{
        "figMinWidth":0,
        "figMaxWidth":0,
        "preferredPlace":"top"
      }
    },
    "tblCaption":{
      "position":"bottom",
      "sideCaption":{
        "figMinWidth":0,
        "figMaxWidth":0,
        "preferredPlace":"top"
      }
    },
"continuedStyle":{
    "table":{
      "footer": {
        "continuedText": "(<i>Continued</i>)",
        "continuedTextStyle": "TBL_Cont",
        "tableBottomDefaultGap": 6
      },
      "header": {
//~         "continuedText":"Table [ID]. [CAPTION][ensp](<i>Continued</i>)",
        "continuedText":"Table [ID].[emsp](<i>Continued</i>)",
        "space-below": 0,
        "repeat-header": true,
        "repeat-sub-header": false,
        "tableLastRowStyle": "TBLR",
        "tableHeadRowStyle": "TCH",
        "tableContinuedStyle": "TBL_ContHead",
        "tableLabelStyle": "tblLabel"
        }
    }
      },
    "adjustParagraphSpaceStyleList":{
        "increase":{
            "before":"jrnlHead1,jrnlHead1_First,jrnlHead2,jrnlHead3,jrnlRefHead,BL-T,NL-T,BL-O,NL-O,QUOTE-T,EQN-O,EQN-T,EQN-B,EQN",
            "after":"BL-B,NL-B,BL-O,NL-O,QUOTE-O,QUOTE-B,EQN-O,EQN-T,EQN-B,EQN"
         },
        "decrease":{
            "before":"jrnlHead1_First,jrnlHead1,jrnlHead2,jrnlRefHead,BL-T,NL-T,BL-O,NL-O,QUOTE-T,EQN-O,EQN-T,EQN-B,EQN",
            "after":"BL-B,NL-B,BL-O,NL-O,QUOTE-O,QUOTE-B,EQN-O,EQN-T,EQN-B,EQN"
         },
        "limitationPercentage":{
            "minimum":[40,45,50],
            "maximum":[60,70,80]
            }
    },
    "detailsForVJ":{
        "VJallowed":true,
        "stylesExcludedForVJ":"jrnlAuthors,jrnlArtTitle,jrnlArtType,jrnlAbsHead,jrnlHead1,jrnlHead2,jrnlHead3,jrnlHead4,jrnlHead5",
        "limitationPercentage":[6,9,12]
        },
    "adjustFloatsSpace":{
        "limitationPercentage":{
            "minimum":[30,35,40],
            "maximum":[60,70,80]
            }        
    },
    "trackingLimit":{
        "minimum":15,
        "maximum":15
    },
    "nonDefaultLayers":["PRIM_SUR"],
    
    "docFontsList":[
       {
          "Goudy Old Style": {
            "Regular": {
                "Symbol (T1)": "Regular"
              },
            "Italic": {
                "Symbol (T1)": "Italic"
              },
            "Bold": {
                "Symbol (T1)": "Bold"
              },
            "Bold Italic": {
                "Symbol (T1)": "Bold"
              }
          }
      },
          {
          "Symbol (T1)": {
            "Regular": {
                "Arial Unicode MS": "Regular"
              },
                "Italic": {
                    "Arial Unicode MS": "Regular"
              },
                "Bold": {
                    "Arial Unicode MS": "Regular"
            }
          }
        }
    ],
    
   "replFonts":[
            {"fontFamily":"Goudy Old Style", "fontStyle":"Roman"},
            {"fontFamily":"Goudy Old Style", "fontStyle":"Italic"},
            {"fontFamily":"Goudy Old Style", "fontStyle":"Bold"},
            {"fontFamily":"Goudy Old Style", "fontStyle":"Bold Italic"},
            {"fontFamily":"Symbol", "fontStyle":"Medium"},
            {"fontFamily":"Symbol", "fontStyle":"Italic"},
            {"fontFamily":"Symbol", "fontStyle":"Bold"}
    ],    
    
    "assignUsingXpath": {
       "toFrames":[
  
{"xpath" : "//div[@class='jrnlCVBL']", "frame-name":"CVBL", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlCRBR']", "frame-name":"CRBR", "action":"move", "styleOverride":null},
           {"xpath" : "//div[@class='jrnlStubBlock']", "frame-name":"STUB_COLUMN", "action":"move", "styleOverride":null},
           {"xpath" : "//div[@class='jrnlTVBL']", "frame-name":"TVBL", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlTRBR']", "frame-name":"TRBR", "action":"move", "styleOverride":null},
         {"xpath" : "////div[@class='AffGroup']", "frame-name":"AffGroup", "action":"move", "styleOverride":null},
        {"xpath" : "//div[@class='jrnlRelatedInfo']", "frame-name":"RELATED_ARTICLE_INFO", "action":"move", "styleOverride":null}
       ]       
     },
    "colorDetails":{
        "undefined":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,100,61,43"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,20,12,9"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,100"
                    }
                },
            "online":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"152,0,46"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"234,194,190"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,0"
                    }
                }            
            },
            "DEFAULT":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,100,61,43"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,20,12,9"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,100"
                    }
                },
            "online":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"152,0,46"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"230,194,190"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,0"
                    }
                }            
            },
          "COMMENTARY":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,100,61,43"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,20,12,9"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,100"
                    }
                },
            "online":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"152,0,46"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"230,194,190"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,0"
                    }
                }            
            },
          "LRTOTEER":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,100,61,43"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,20,12,9"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,100"
                    }
                },
            "online":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"152,0,46"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"230,194,190"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,0"
                    }
                }            
            },
          "EDITORIAL":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,100,61,43"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,20,12,9"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,100"
                    }
                },
            "online":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"152,0,46"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"230,194,190"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,0"
                    }
                }            
            },
        "CNCR":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,100,61,43"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,20,12,9"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,100"
                    }
                },
            "online":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"152,0,46"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"234,194,190"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,0"
                    }
                }            
            },
          "BKRW":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,100,61,43"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,20,12,9"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,100"
                    }
                },
            "online":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"152,0,46"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"230,194,190"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,0"
                    }
                }            
            },
            "THANK":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"90,90,0,0"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"30,20,0,0"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,100"
                    }
                },
            "online":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"65,64,153"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"175,189,225"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,255"
                    }
                }            
            },
        "MISCELLANEOUS":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"90,90,0,0"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"30,20,0,0"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,100"
                    }
                },
            "online":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"65,64,153"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"175,189,225"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,255"
                    }
                }            
          
            }
        },
     "tableSetter" :{
            "table" : {
                "css" : {
                    "font-size" : "11pt",
                    "font-family" : "'GOUDOS', GOUDOS"
                },
                "fontPath"  : "GOUDOS/GOUDOS.ttf"
            },
            "thead": {
                "css" : {
                    "font-family" : "'GOUDOS',GOUDOS",
                    "font-size" : "11pt",
                    "line-height" : "13pt",
                     "padding" : "4px 4px 4px 4px",
                },
                "align" : "left",
                "valign": "bottom"
            },
            "tbody":{
                "css" : {
                    "font-family" : "'GOUDOS',GOUDOS",
                    "font-size" : "11pt",
                    "line-height" : "13pt",
                    "padding" : "4px 4px 4px 4px",
                },
                "align" : "left",
                "valign": "bottom"
            }
        },
     "equation" : {
          "default" : {
              "page":{
                  "size" : "612 pt"
              },
              "font" : {
                  "size"    : "11pt",
                  "ledding" : "13pt",
                  "path"    : "/GOUDOS/",
                     "ext"     : "ttf",
                  "bold"    : "GOUDOS-Bold",
                  "italic"  : "GOUDOS-Italic",
                  "bold_italic":"GOUDOS-Bold",
                  "main"    : "GOUDOS"
              }
           },
           "jrnlTblBlock" : {
              "page":{
                  "size" : "612 pt"
              },
              "font" : {
                "size"    : "11pt",
                "ledding" : "13pt",
                 "path"    : "/GOUDOS/",
                     "ext"     : "ttf",
                  "bold"    : "GOUDOS-Bold",
                  "italic"  : "GOUDOS-Italic",
                  "bold_italic":"GOUDOS-Bold",
                  "main"    : "GOUDOS"

              }
           }
        },
    "stubColObj":{
        "top": {
            "STUB_COLUMN": false,
            "STUB_STMT": false
        },
        "bottom": {
            "METAINFO": true,
            "CROSSMARK": false,
            "RELATED_ARTICLE_INFO": true
        }
    },
 "runOnSectionsOrArticles":[
       {"xpath":"//div[@class='jrnlAppGroup']",
            "continueType":"freshPage",
            "spaceAbove":30,
            "firstbaselineOffset":1296135023,
            "columnDetails":{        
                "openerPageColumnDetails":[
                  {"width":495, "height":610,"floatsCited":false,"gutter":0}
                ],
                "columnDetails":[
                  {"width":495, "height":684,"floatsCited":false,"gutter":0},
                ],
                "openerPageMargin":{
                 "top":54,
                "bottom":54,
                "inside":81,
                "outside":36
                },
            "otherPageMargin":{
                "top":54,
                "bottom":54,
                "inside":81,
                "outside":36
                }
                }
            }
        ]
}