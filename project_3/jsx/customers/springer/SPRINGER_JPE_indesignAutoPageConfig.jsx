var config = {
    "defaultUnits":"pt",
    "baseLeading":13,
    "preferredPlaceColumn":0,
    "baseAlignmentItterationLimit":3,
    "floatLandscape":false,
    "pageCountDetails":"Rounded",
    "floatOnFirstPageForDefaultLayout":true,
    "landscapeFloatOnFirstPage":false,
    "articleTypeNotFloatsOnFirstPage":["undefined","DEFAULT","FEAE"
    ],
    "floatTypeOnFirstPage":"KEY,KEY_BACK",
    "minStackSpace":18,
    "placeStyle":"Sandwich",
    "figCaptionMinLines": 0,
    "minNoLinesOnPag":3,
    "applyTableLeftRightBorder":true,
    "applyTableBorderWidth":0.15,
    "applyTableBorderColor":'WHITE',
    "pageSize":{
        "width":602.64,
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
    "geoBoundsVerso":[48,127.28,714,554.64
    ],
    "geoBoundsRecto":[48,650.64,714,1078
    ],
    "articleTypeDetails":{
    "undefined":"LAYOUT1",
    "CGENME":"LAYOUT2",
    "INTSIE":"LAYOUT2",
    "FEAE":"LAYOUT2",
    "CEBH":"LAYOUT3"
    },
    "pageColumnDetails":{
        "LAYOUT1":{
            "openerPageColumnDetails":[
                  {"width":207, "height":573.9,"floatsCited":false,"gutter":0},
                  {"width":207, "height":573.9,"floatsCited":false,"gutter":13.36}
                ],
                "columnDetails":[
                  {"width":207, "height":666,"floatsCited":false,"gutter":0},
                  {"width":207, "height":666,"floatsCited":false,"gutter":13.36}
                ],
                "openerPageMargin":{
                 "top":71,
                "bottom":78,
                "inside":48,
                "outside":36
                },
            "otherPageMargin":{
                 "top":48,
                "bottom":78,
                "inside":48,
                "outside":127.28
                },
            "miscColumnDetails":[
                  {"width":85.035, "height":666,"floatsCited":false,"gutter":6.245},
                ],
             "miscColumnOn":"outside"//the other possibilities would be 'inside' or 'leftside' or 'rightside'   
            }, 
        "LAYOUT2":{
            "openerPageColumnDetails":[
                  {"width":207, "height":573.9,"floatsCited":false,"gutter":0},
                  {"width":207, "height":573.9,"floatsCited":false,"gutter":13.36}
                ],
                "columnDetails":[
                  {"width":207, "height":666,"floatsCited":false,"gutter":0},
                  {"width":207, "height":666,"floatsCited":false,"gutter":13.36}
                ],
                "openerPageMargin":{
                 "top":71,
                "bottom":78,
                "inside":48,
                "outside":36
                },
            "otherPageMargin":{
                 "top":48,
                "bottom":78,
                "inside":48,
                "outside":127.28
                },
            "miscColumnDetails":[
                  {"width":85.035, "height":666,"floatsCited":false,"gutter":6.245},
                ],
             "miscColumnOn":"outside"//the other possibilities would be 'inside' or 'leftside' or 'rightside'   
            }, 
        "LAYOUT3":{
            "openerPageColumnDetails":[
                  {"width":207, "height":573.9,"floatsCited":false,"gutter":0},
                  {"width":207, "height":573.9,"floatsCited":false,"gutter":13.36}
                ],
                "columnDetails":[
                  {"width":207, "height":666,"floatsCited":false,"gutter":0},
                  {"width":207, "height":666,"floatsCited":false,"gutter":13.36}
                ],
                "openerPageMargin":{
                 "top":71,
                "bottom":78,
                "inside":48,
                "outside":36
                },
            "otherPageMargin":{
                 "top":48,
                "bottom":78,
                "inside":48,
                "outside":127.28
                },
            "miscColumnDetails":[
                  {"width":85.035, "height":666,"floatsCited":false,"gutter":6.245},
                ],
             "miscColumnOn":"outside"//the other possibilities would be 'inside' or 'leftside' or 'rightside'   
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
            "before":"jrnlHead1,jrnlHead1_First,jrnlHead2,jrnlHead3,jrnlRefHead,BL-T,NL-T,BL-O,NL-O,QUOTE-T,QUOTE-O,EQN-O,EQN-T,EQN-B,EQN",
            "after":"BL-B,NL-B,BL-O,NL-O,QUOTE-O,QUOTE-B,EQN-O,EQN-B"
         },
        "decrease":{
            "before":"jrnlHead1,jrnlHead1_First,jrnlHead2,jrnlHead3,jrnlRefHead,BL-T,NL-T,BL-O,NL-O,QUOTE-T,QUOTE-O,EQN-O,EQN-T,EQN-B,EQN",
            "after":"BL-B,NL-B,BL-O,NL-O,QUOTE-O,QUOTE-B,EQN-O,EQN-B"
         },
        "limitationPercentage":{
            "minimum":[40,45,50],
            "maximum":[60,70,80]
            }
    },
    "detailsForVJ":{
        "VJallowed":true,
        "stylesExcludedForVJ":"jrnlAuthors,jrnlArtTitle,jrnlArtType,jrnlAbsHead,jrnlHead1,jrnlHead2,jrnlHead3",
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
          "Minion": {
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
          "Univers": {
            "47 Light Condensed": {
                "Symbol (T1)": "Regular"
              },
                "48 Light Condensed Italic": {
                    "Symbol (T1)": "Italic"
              },
                "57 Condensed": {
                    "Symbol (T1)": "Regular"
            },
                "58 Condensed Italic": {
                    "Symbol (T1)": "Italic"
            },
                "67 Bold Condensed": {
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
            {"fontFamily":"Minion", "fontStyle":"Roman"},
            {"fontFamily":"Minion", "fontStyle":"Italic"},
            {"fontFamily":"Minion", "fontStyle":"Bold"},
            {"fontFamily":"Minion", "fontStyle":"Bold Italic"},
            {"fontFamily":"Univers", "fontStyle":"47 Light Condensed"},
            {"fontFamily":"Univers", "fontStyle":"48 Light Condensed Italic"},
            {"fontFamily":"Univers", "fontStyle":"57 Condensed"},
            {"fontFamily":"Univers", "fontStyle":"58 Condensed Italic"},
            {"fontFamily":"Univers", "fontStyle":"67 Bold Condensed"},
            {"fontFamily":"Symbol", "fontStyle":"Medium"},
            {"fontFamily":"Symbol", "fontStyle":"Italic"},
            {"fontFamily":"Symbol", "fontStyle":"Bold"}
    ],    
    
    "assignUsingXpath": {
       "toFrames":[
        {"xpath" : "//div[@class='jrnlStubBlock']", "frame-name":"STUB_COLUMN", "action":"move", "styleOverride":null},
         {"xpath" : "//p[@pstyle='jrnlCVBR']", "frame-name":"CVBR", "action":"move", "styleOverride":null},
         {"xpath" : "//p[@pstyle='jrnlCRBL']", "frame-name":"CRBL", "action":"move", "styleOverride":null},
         {"xpath" : "//p[@pstyle='jrnlTRBL']", "frame-name":"TRBL", "action":"move", "styleOverride":null},
          {"xpath" : "//p[@pstyle='jrnlTVBR']", "frame-name":"TVBR", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlMetaInfo']", "frame-name":"METAINFO", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlRelatedInfo']", "frame-name":"RELATED_ARTICLE_INFO", "action":"move", "styleOverride":null}
       ]       
     },
    "colorDetails":{
        "undefined":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,100"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,20"
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
                    "colourValue":"0,0,0"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"209,211,212"
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
                    "colourValue":"0,0,0,100"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,20"
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
                    "colourValue":"0,0,0"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"209,211,212"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,0"
                    }
                }            
            },
            "CGENME":{
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
          "INTSIE":{
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
          "FEAE":{
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
            },
          "CEBH":{
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
                    "font-size" : "8.5pt",
                    "font-family" : "'UniversLTStd', UniversLTStd"
                },
                "fontPath"  : "UniversLTStd/UniversLTStd-LightCn.otf"
            },
            "thead": {
                "css" : {
                    "font-family" : "'UniversLTStd-Cn', UniversLTStd-Cn",
                    "font-size" : "9pt",
                    "line-height" : "12pt",
                    "padding" : "0.5px 0px 0.5px 0px",
                },
                "align" : "left",
                "valign": "bottom"
            },
            "tbody":{
                "css" : {
                    "font-family" : "'UniversLTStd-LightCn', UniversLTStd-LightCn",
                    "font-size" : "8.5pt",
                    "line-height" : "11pt",
                    "padding" : "0px 0px 0.5px 0px",
                },
                "align" : "left",
                "valign": "bottom"
            }
        },
        "equation" : {
          "default" : {
              "page":{
                  "size" : "602pt"
              },
              "font" : {
                  "size"    : "10pt",
                  "ledding" : "13pt",
                  "path"    : "/Minion/",
                  "ext"     : "ttf",
                  "bold"    : "Minion-Bold",
                  "italic"  : "Minion-Italic",
                  "bold_italic":"Minion-Bold",
                  "main"    : "Minion-Roman"
              }
           },
           "jrnlTblBlock" : {
              "page":{
                  "size" : "602pt"
              },
              "font" : {
                "size"    : "9pt",
                "ledding" : "13pt",
                "path"    : "/UniversLTStd/",
                "ext"     : "otf",
                  "bold"    : "UniversLTStd-BoldCn",
                  "italic"  : "UniversLTStd-CnObl",
                  "bold_italic":"UniversLTStd-BoldCnObl",
                  "main"    : "UniversLTStd-LightCn"
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
                    {"width":427.36, "height":573.9,"floatsCited":false,"gutter":0}
                    ],
                    "columnDetails":[
                    {"width":427.36, "height":573.9,"floatsCited":false,"gutter":0}
                      ],
                    "openerPageMargin":{
                      "top":71,
                "bottom":78,
                "inside":48,
                "outside":36
                },
            "otherPageMargin":{
                 "top":48,
                "bottom":78,
                "inside":48,
                "outside":127.28
                    }
                
                }
            }
        ]
}