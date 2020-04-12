var config = {
    "bookmarks":4,
    "defaultUnits":"pt",
    "baseLeading":13,
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
    "applyTableBorderWidth":0,
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
    "watermark":{
        "Pre-editing":true, 
        "Typesetter QA":true, 
        "Author proof":true, 
        "Author revision":true, 
        "Revises":true
        },
    "wrapAroundFloat":{
      "top":18,
      "bottom":18,
      "left":12.5,
      "right":12.5,
      "gutter":12.5
    },
    "geoBoundsVerso":[86,72,713,540
    ],
    "geoBoundsRecto":[86,72,713,540
    ],
    "articleTypeDetails":{
    "undefined":"LAYOUT1",
    "DEFAULT":"LAYOUT1"
    },
    "pageColumnDetails":{
        "LAYOUT1":{        
            "openerPageColumnDetails":[
                  {"width":468, "height":535.75,"floatsCited":false,"gutter":0}
                ],
                "columnDetails":[
                  {"width":223, "height":627,"floatsCited":false,"gutter":0},
                  {"width":223, "height":627,"floatsCited":false,"gutter":22}
                ],
                "openerPageMargin":{
                 "top":86,
                "bottom":79,
                "inside":72,
                "outside":72
                },
            "otherPageMargin":{
                 "top":86,
                "bottom":79,
                "inside":72,
                "outside":72
                }
            }        
        },
    "jrnlBoxBlock":{
        "KEY":{
            "calcCitationHeight":false,
            "preferredOnCurrentPage":true,
            "preferredOnColumn":0,
            "preferredOnMargin":true,
        "versoPageValue":45,
        "rectoPageValue":0,
            "preferredPlacement":null
        },
        "KEY_BACK":{
            "calcCitationHeight":false,
            "preferredOnCurrentPage":true,
            "preferredOnColumn":0,
            "preferredPlacement":null
        }
    },
    "landscape":{
      "singleColumnStyle":false,
      "twoThirdColumnStyle":false,
      "twoThirdWidth":340.85, 
      "horizontalCenter":true
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
        "stylesExcludedForVJ":"jrnlArtTitle,jrnlHead1,jrnlHead2,jrnlHead3",
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
          "Adobe Garamond Pro": {
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
          "Din": {
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
            {"fontFamily":"Adobe Garamond Pro", "fontStyle":"Roman"},
            {"fontFamily":"Adobe Garamond Pro", "fontStyle":"Italic"},
            {"fontFamily":"Adobe Garamond Pro", "fontStyle":"Bold"},
            {"fontFamily":"Adobe Garamond Pro", "fontStyle":"Bold Italic"},
            {"fontFamily":"Raleway", "fontStyle":"Medium"},
            {"fontFamily":"Din", "fontStyle":"Italic"},
            {"fontFamily":"Din", "fontStyle":"Roman"},
            {"fontFamily":"Din", "fontStyle":"Bold Italic"},
            {"fontFamily":"Din", "fontStyle":"Bold"},
            {"fontFamily":"Symbol", "fontStyle":"Medium"},
            {"fontFamily":"Symbol", "fontStyle":"Italic"},
            {"fontFamily":"Symbol", "fontStyle":"Bold"}
    ],    
    
    "assignUsingXpath": {
       "toFrames":[
         {"xpath" : "//div[@class='jrnlStubBlock']", "frame-name":"STUB_COLUMN", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlCVTL']", "frame-name":"CVTL", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlCRTL']", "frame-name":"CRTL", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlTVTL']", "frame-name":"TVTL", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlTRTL']", "frame-name":"TRTL", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlCRB']", "frame-name":"CRB", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlCVB']", "frame-name":"CVB", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlTVB']", "frame-name":"TVB", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlTRB']", "frame-name":"TRB", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlAffGroup']", "frame-name":"METAINFO", "action":"move", "styleOverride":null}
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
                    "colourValue":"0,0,0,70"
                    },
                "COLOR3":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,0"
                    },
                "COLOR4":{
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
                    "colourValue":"0,0,0"
                    },
                "COLOR3":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,0"
                    },
                "COLOR4":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,0"
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
                    "colourValue":"0,0,0,70"
                    },
                "COLOR3":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,0"
                    },
                "COLOR4":{
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
                    "colourValue":"0,0,0"
                    },
                "COLOR3":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,0"
                    },
                "COLOR4":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,0"
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
                    "font-size" : "10px",
                    "font-family" : "'TimesNewRoman', TimesNewRoman"
                },
                "fontPath"  : "TimesNewRoman/TimesNewRoman.ttf"
            },
            "thead": {
                "css" : {
                    "font-family" : "'TimesNewRoman-Bold',TimesNewRoman-Bold",
                    "font-size" : "10px",
                    "line-height" : "12px",
                    "padding" : "0.5px 0px 0.5px 0px",
                },
                "align" : "left",
                "valign": "bottom"
            },
            "tbody":{
                "css" : {
                    "font-family" : "'TimesNewRomanRegular',TimesNewRoman-Regular",
                    "font-size" : "10px",
                    "line-height" : "12px",
                    "padding" : "0px 0px 0px 0px",
                },
                "align" : "left",
                "valign": "bottom"
            }
        },
     "equation" : {
          "default" : {
              "page":{
                  "size" : "468pt"
              },
              "font" : {
                  "size"    : "12pt",
                  "ledding" : "14pt",
                  "path"    : "/TimesNewRoman/",
                  "ext"     : "ttf",
                  "bold"    : "TimesNewRoman-Bold",
                  "italic"  : "TimesNewRoman-Italic",
                  "bold_italic":"TimesNewRoman-BoldItalic",
                  "main"    : "TimesNewRoman"
              }
           },
           "jrnlTblBlock" : {
              "page":{
                  "size" : "468pt"
              },
              "font" : {
                "size"    : "10pt",
                "ledding" : "12pt",
                "path"    : "/TimesNewRoman/",
                "ext"     : "ttf",
                  "bold"    : "TimesNewRoman-Bold",
                  "italic"  : "TimesNewRoman-Italic",
                  "bold-italic":"TimesNewRoman-BoldItalic",
                  "main":"TimesNewRoman",
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
            "RELATED_ARTICLE_INFO": true
        }
    },
"runOnSectionsOrArticles":[
        {"xpath":"//div[@class='jrnlRefGroup']",
            "continueType":"freshPage",
            "spaceAbove":30,
            "firstbaselineOffset":1296852079,
            "columnDetails":{
            "openerPageColumnDetails":[
                  {"width":468, "height":535.75,"floatsCited":false,"gutter":0}
                  ],
                "columnDetails":[
                  {"width":223, "height":627,"floatsCited":false,"gutter":0},
                  {"width":223, "height":627,"floatsCited":false,"gutter":22}
                    ],
                "openerPageMargin":{
                 "top":86,
                "bottom":79,
                "inside":72,
                "outside":72
                },
            "otherPageMargin":{
                 "top":86,
                "bottom":79,
                "inside":72,
                "outside":72
                }
            }
        },
     {"xpath":"//div[@class='jrnlFootNoteFNGroup']",
            "continueType":"freshPage",
            "spaceAbove":30,
            "firstbaselineOffset":1296852079,
            "columnDetails":{
            "openerPageColumnDetails":[
                  {"width":468, "height":535.75,"floatsCited":false,"gutter":0}
                    ],
                "columnDetails":[
                  {"width":223, "height":627,"floatsCited":false,"gutter":0},
                  {"width":223, "height":627,"floatsCited":false,"gutter":22}
                    ],
                "openerPageMargin":{
                 "top":86,
                "bottom":79,
                "inside":72,
                "outside":72
                },
            "otherPageMargin":{
                 "top":86,
                "bottom":79,
                "inside":72,
                "outside":72
                }
            }
        },
    ] 
}