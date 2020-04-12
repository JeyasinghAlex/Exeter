var config = {
    "defaultUnits":"pt",
    "baseLeading":12,
    "preferredPlaceColumn":0,
    "baseAlignmentItterationLimit":3,
    "floatLandscape":false,
    "pageCountDetails":"Rounded",
    "floatOnFirstPageForDefaultLayout":true,
    "landscapeFloatOnFirstPage":false,
    "articleTypeNotFloatsOnFirstPage":["undefined","DEFAULT"
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
            "offset":9
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
    "geoBoundsVerso":[36,72,720,552
    ],
    "geoBoundsRecto":[36,672,720,1152
    ],
    "articleTypeDetails":{
    "undefined":"LAYOUT1",
    "DEFAULT":"LAYOUT1",
    "BKRW":"LAYOUT2"
    },
    "pageColumnDetails":{
        "LAYOUT1":{        
            "openerPageColumnDetails":[
                  {"width":228, "height":630,"floatsCited":false,"gutter":0},
                  {"width":228, "height":630,"floatsCited":false,"gutter":24}
                ],
                "columnDetails":[
                  {"width":228, "height":684,"floatsCited":false,"gutter":0},
                  {"width":228, "height":684,"floatsCited":false,"gutter":24}
                ],
                "openerPageMargin":{
                 "top":90,
                "bottom":72,
                "inside":60,
                "outside":72
                },
            "otherPageMargin":{
                 "top":36,
                "bottom":72,
                "inside":60,
                "outside":72
                }
            },
         "LAYOUT2":{
                "openerPageColumnDetails":[
                  {"width":228, "height":630,"floatsCited":false,"gutter":0},
                  {"width":228, "height":630,"floatsCited":false,"gutter":24}
                ],
                "columnDetails":[
                  {"width":228, "height":684,"floatsCited":false,"gutter":0},
                  {"width":228, "height":684,"floatsCited":false,"gutter":24}
                ],
                 "openerPageMargin":{
                 "top":90,
                "bottom":72,
                "inside":60,
                "outside":72
                },
            "otherPageMargin":{
                 "top":36,
                "bottom":72,
                "inside":60,
                "outside":72
                }
             },
         "LAYOUT3":{
                "openerPageColumnDetails":[
                  {"width":228, "height":630,"floatsCited":false,"gutter":0},
                  {"width":228, "height":630,"floatsCited":false,"gutter":24}
                ],
                "columnDetails":[
                  {"width":228, "height":684,"floatsCited":false,"gutter":0},
                  {"width":228, "height":684,"floatsCited":false,"gutter":24}
                ],
                 "openerPageMargin":{
                 "top":90,
                "bottom":72,
                "inside":60,
                "outside":72
                },
            "otherPageMargin":{
                 "top":36,
                "bottom":72,
                "inside":60,
                "outside":72
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
        "continuedText": "(<i>(Continued)</i>)",
        "continuedTextStyle": "TBL_Cont",
        "tableBottomDefaultGap": 6
      },
      "header": {
        "continuedText":"Table [ID]. [CAPTION][ensp](<i>(Continued)</i>)",
       // "continuedText":"Table [ID].[emsp](<i>Continued</i>)",
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
          "ITC Galliard": {
            "Roman": {
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
          "Bernhard Modern Std": {
            "Regular": {
                "Symbol (T1)": "Regular"
              },
                "Italic": {
                    "Symbol (T1)": "Italic"
              },
                "Bold Italic": {
                    "Symbol (T1)": "Bold Italic"
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
            {"fontFamily":"ITC Galliard", "fontStyle":"Roman"},
            {"fontFamily":"ITC Galliard", "fontStyle":"Italic"},
            {"fontFamily":"ITC Galliard", "fontStyle":"Bold"},
            {"fontFamily":"ITC Galliard", "fontStyle":"Bold Italic"},
            {"fontFamily":"Bernhard Modern Std", "fontStyle":"Roman"},
            {"fontFamily":"Bernhard Modern Std", "fontStyle":"Italic"},
            {"fontFamily":"Bernhard Modern Std", "fontStyle":"Bold"},
            {"fontFamily":"Bernhard Modern Std", "fontStyle":"Bold Italic"},
            {"fontFamily":"Symbol", "fontStyle":"Medium"},
            {"fontFamily":"Symbol", "fontStyle":"Italic"},
            {"fontFamily":"Symbol", "fontStyle":"Bold"}
    ],    
    
    "assignUsingXpath": {
       "toFrames":[
         {"xpath" : "//div[@class='jrnlStubBlock']", "frame-name":"STUB_COLUMN", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlCRRF']", "frame-name":"CRRH", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlCLRF']", "frame-name":"CLRH", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlRRF']", "frame-name":"RRH", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlLRF']", "frame-name":"LRH", "action":"move", "styleOverride":null},
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
                    "colourValue":"0,0,0,0"
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
                    "colourValue":"255,255,255"
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
                    "colourValue":"0,0,0,100"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,0"
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
                    "colourValue":"255,255,255"
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
            "thead": {
                "css" : {
                    "font-family" : "'Dante MT', Times New Roman",
                    "font-size" : "10px",
                    "line-height" : "12px",
                    "padding" : "0px 0px 0px 0px",
                },
                 "fontPath"  : "Dante MT/Dante MT.ttf",
                "align" : "left",
                "valign": "bottom"
            },
            "tbody":{
                "css" : {
                    "font-family" : "'Dante MT', Times New Roman",
                    "font-size" : "9px",
                    "line-height"  : "10px",
                    "padding" : "0px 0px 0px 0px",
                },
                 "fontPath"  : "Dante MT/Dante MT.ttf",
                "align" : "left",
                "valign": "bottom"
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
                  {"width":228, "height":630,"floatsCited":false,"gutter":0},
                  {"width":228, "height":630,"floatsCited":false,"gutter":24}
                ],
                "columnDetails":[
                  {"width":228, "height":684,"floatsCited":false,"gutter":0},
                  {"width":228, "height":684,"floatsCited":false,"gutter":24}
                ],
                "openerPageMargin":{
                 "top":90,
                "bottom":72,
                "inside":60,
                "outside":72
                },
            "otherPageMargin":{
                 "top":36,
                "bottom":72,
                "inside":60,
                "outside":72
                }
                }
            }
        ]
}