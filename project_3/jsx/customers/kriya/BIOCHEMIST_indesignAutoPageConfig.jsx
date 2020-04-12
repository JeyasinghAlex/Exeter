var config = {
    "epageFormat":1,
    "retainEpageExtent":true,
    "bookmarks":4,
    "pubIdentifier":"10.1136", 
    "defaultUnits":"pt",
    "baseLeading":15,
    "preferredPlaceColumn":0,
    "baseAlignmentItterationLimit":3,
    "floatLandscape":false,
    "floatOnFirstPageForDefaultLayout":true,
    "landscapeFloatOnFirstPage":false,
    "articleTypeNotFloatsOnFirstPage":["undefined","DEFAULT"
    ],
    "floatTypeOnFirstPage":"KEY,KEY_BACK",
    "minStackSpace":18,
    "placeStyle":"Sandwich",
    "figCaptionMinLines": 0,
    "minNoLinesOnPag":3,
    "applyTableLeftRightBorder":false,
    "applyTableBorderWidth":0.15,
    "applyTableBorderColor":'WHITE',
    "calcParaBoundsForStages": {
    "Pre-editing": true,
    "Typesetter QA": true,
    "Author proof": true,
    "Author revision": true,
    "Revises": true,
    "Copyediting": true,
    "Copyediting Check": true,
    "Typesetter Check": true,
    "Publisher Check": true,
    "Author Review": true,
    "Publisher Review": true,
    "Author Revision": true
  },
    "pageSize":{
        "width":595.276,
        "height":788.031
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
    "watermark":{
        "Pre-editing":true, 
        "Typesetter QA":true, 
        "Author proof":true, 
        "Author revision":true, 
        "Revises":true,
        "Copyediting":true, 
        "Copyediting Check":true, 
        "Typesetter Check":true, 
        "Publisher Check":true, 
        "Author Review":true, 
        "Publisher Review":true, 
        "Author Revision":true
        },
    "wrapAroundFloat":{
      "top":18,
      "bottom":18,
      "left":12.5,
      "right":12.5,
      "gutter":12.5
    },
    "geoBoundsVerso":[81.5,136,737.031496062992,553.275590551181
    ],
    "geoBoundsRecto":[81.5,42,737.031496062992,459.275590551181
    ],
    "articleTypeDetails":{
    "undefined":"LAYOUT1",
    "DEFAULT":"LAYOUT1",
    },
    "pageColumnDetails":{
        "LAYOUT1":{        
            "openerPageColumnDetails":[
                  {"width":201.638, "height":655.531,"floatsCited":false,"gutter":0},
                  {"width":201.638, "height":655.531,"floatsCited":false,"gutter":14}
                ],
            "columnDetails":[
                  {"width":201.638, "height":655.531,"floatsCited":false,"gutter":0},
                  {"width":201.638, "height":655.531,"floatsCited":false,"gutter":14}
                ],
            "openerPageMargin":{
                "top":81.5,
                "bottom":51,
                "inside":42,
                "outside":136
                },
            "otherPageMargin":{
                "top":81.5,
                "bottom":51,
                "inside":42,
                "outside":136
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
    },
    "sideCaption":{
        "figMinWidth":0,
        "figMaxWidth":93.5,
        "gutter":93.5,
        "maximumPercent": 100,
        "alignTo":"left",
        "preferredPlace":"left"
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
        },
     "figure":{
      "footer": {
        "continuedText": " (Continued)",
         "repeat-header": true,
        "repeatLabel":true,
        "repeat-sub-header": false,
        "continuedTextStyle": "FIG_Cont",
        "figureBottomDefaultGap": 6
        },
      "header": {
        "continuedText":" ",
         "repeat-header": false,
        "repeatLabel":false,
        "repeat-sub-header": false,
        "spaceBelow": 6,
        "figureContinuedStyle": "FIG_ContHead"
            }
        }
      },
    "adjustParagraphSpaceStyleList":{
        "increase":{
            "before":"jrnlHead1,jrnlHead1_First,jrnlHead2,jrnlHead3,jrnlRefHead,BL-T,NL-T,BL-O,NL-O,QUOTE-T",
            "after":"BL-B,NL-B,BL-O,NL-O,QUOTE-O,QUOTE-B"
         },
        "decrease":{
            "before":"jrnlHead1_First,jrnlHead1,jrnlHead2,jrnlRefHead,BL-T,NL-T,BL-O,NL-O,QUOTE-T",
            "after":"BL-B,NL-B,BL-O,NL-O,QUOTE-O,QUOTE-B"
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
            "minimum":[30,35,45],
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
          "Myriad Pro": {
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
          "Minion Pro": {
            "Regular": {
                "Symbol (T1)": "Regular"
              },
                "Italic": {
                    "Symbol (T1)": "Italic"
              },
                "Bold Italic": {
                    "Symbol (T1)": "Bold"
            },
                "Bold": {
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
            {"fontFamily":"Myriad Pro", "fontStyle":"Regular"},
            {"fontFamily":"Myriad Pro", "fontStyle":"Italic"},
            {"fontFamily":"Myriad Pro", "fontStyle":"Bold"},
            {"fontFamily":"Myriad Pro", "fontStyle":"Bold Italic"},
            {"fontFamily":"Minion Pro", "fontStyle":"Regular"},
            {"fontFamily":"Minion Pro", "fontStyle":"Italic"},
            {"fontFamily":"Minion Pro", "fontStyle":"Bold"},
            {"fontFamily":"Minion Pro", "fontStyle":"Bold Italic"},
            {"fontFamily":"Symbol", "fontStyle":"Medium"},
            {"fontFamily":"Symbol", "fontStyle":"Italic"},
            {"fontFamily":"Symbol", "fontStyle":"Bold"}
    ],    
    
    "assignUsingXpath": {
       "toFrames":[
         {"xpath" : "//div[@class='jrnlStubBlock_recto']", "frame-name":"STUB_COLUMN_RECTO", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlStubBlock_verso']", "frame-name":"STUB_COLUMN_VERSO", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='front']//div[@class='jrnlTVBL']", "frame-name":"TVBL", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='front']//div[@class='jrnlTRBR']", "frame-name":"TRBR", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='front']//div[@class='jrnlCRBR']", "frame-name":"CRBR", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='front']//div[@class='jrnlCVBL']", "frame-name":"CVBL", "action":"move", "styleOverride":null}
         ]       
     },
    "colorDetails":{
        "undefined":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"100,100,26,20"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"21,18,1,0"
                    },
                "COLOR3":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"9,9,2,0"
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
                    "colourValue":"41,38,102"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"197,199,225"
                    },
                "COLOR3":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"228,225,235"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,0"
                    }
                }                      
            }
        },
     "tableSetter" :{
            "table" : {
                "css" : {
                    "font-size" : "9px",
                    "font-family" : "'Frutiger LT Pro', Frutiger LT Pro-57 Condensed"
                },
                "fontPath"  : "frutigerltpro-condensed/frutigerltpro-condensed.otf"
            },
            "thead": {
                "css" : {
                    "font-family" : "'Frutiger LT Pro-67 Bold Condensed',FrutigerLTPro-67BoldCondensed",
                    "font-size" : "9px",
                    "line-height" : "12px",
                    "padding" : "4px 4px 4px 4px",
                },
                "fontPath"  : "frutigerltpro-condensed/frutigerltpro-boldcn_0.otf",
                "align" : "left",
                "valign": "bottom"
            },
            "tbody":{
                "css" : {
                    "font-family" : "'Frutiger LT Pro-57 Condensed',FrutigerLTPro-57Condensed",
                    "font-size" : "9px",
                    "line-height" : "12px",
                    "padding" : "4px 4px 4px 4px",
                },
                "fontPath"  : "frutigerltpro-condensed/frutigerltpro-condensed.otf",
                "align" : "left",
                "valign": "bottom"
            }
        },
     "equation" : {
          "default" : {
              "page":{
                  "size" : "417.276pt"
              },
              "font" : {
                  "size"    : "9pt",
                  "ledding" : "11pt",
                  "path"    : "/ClassGarmnd_BT_Font/",
                     "ext"     : "ttf",
                  "bold"    : "CLSGARAB",
                  "italic"  : "CLSGARAI",
                  "bold_italic":"CLSGARBI",
                  "main"    : "CLSGARAN"
              }
           },
           "jrnlTblBlock" : {
              "page":{
                  "size" : "417.276pt"
              },
              "font" : {
                "size"    : "9pt",
                "ledding" : "12pt",
                "path"    : "/frutigerltpro-condensed/",
                "ext"     : "otf",
                  "bold"    : "frutigerltpro-boldcn_0",
                  "italic"  : "frutigerltpro-condensedita",
                  "bold-italic":"frutigerltpro-boldcnita",
                  "main":"frutigerltpro-condensed",
              }
           }
        },
    "stubColObj":{
        "bottom": {
            "METAINFO": false,
            "COPYRIGHTSTMT_INFO": false,
            "CROSSMARK": false,
            "RELATED_ARTICLE_INFO": false
        },
        "top": {
            "STUB_COLUMN": true,
            "STUB_COLUMN_RECTO": true,
            "STUB_COLUMN_VERSO": true,
            "STUB_STMT": false
        }
    }
}