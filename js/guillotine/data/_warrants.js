const allWarrants = {
  "0101": [1676,1217,1797,256,1716,12,1107,288,882,1626,1975,22,2042,720,700,2278,2073,1780,673,1348],
  "0102": [1513,1541,664,1328,1709,1862,87,184,2330,1496,2168,410,1479,49,858,826,2229,1968,2309,180],
  "0103": [1731,2286,1175,43,1831,617,927,120,636,946,1332,1717,347,202,2579,516,46,2016,2545,1951],
  "0104": [676,1785,44,1818,590,1692,331,1682,144,1214,1808,444,434,2352,700,2462,630,1763,2281,186],
  "0105": [70,593,521,1165,1737,508,651,969,1043,241,68,1453,1466,1111,1856,2439,2529,1498,1034,838],
  "0106": [273,1060,2333,484,1434,1341,1693,2396,1890,709,57,114,113,2115,2013,949,1941,1132,378,770],
  "0107": [1842,265,1620,1600,1744,2591,1048,66,1722,1976,2321,1113,1926,465,299,1514,1479,337,1886,16],
  "0108": [232,248,2456,1889,235,676,2596,1119,165,962,1497,480,1157,1515,598,735,1974,1098,543,2121],
  "0109": [400,1763,1876,65,629,1846,324,338,1992,1873,2174,603,102,2495,1181,1152,2303,427,1488,2358],
  "0110": [833,2194,444,1259,703,1137,1296,2075,878,1118,2238,865,836,1552,63,649,1441,125,1344,807],
  "0111": [660,1673,272,1176,890,1730,2144,620,440,1412,1776,987,717,2227,913,1186,2103,923,2069,1154],
  "0112": [1050,1036,2265,1077,728,999,230,1713,1818,2184,2205,425,2018,1441,838,2380,579,839,315,2535],
  "0113": [1024,1058,1346,844,891,597,2591,260,1035,2405,108,1605,2490,617,1590,1158,294,1568,338,1463],
  "0114": [2165,2561,98,378,701,541,190,192,1654,521,1469,1065,653,481,2596,2198,1911,1064,1468,1046],
  "0115": [518,1738,2150,1037,1454,2560,2185,1816,2317,2047,374,459,2451,2346,286,1629,263,1068,273,1370],
  "0116": [1493,376,988,312,1289,2123,2371,22,1514,155,1153,248,778,2484,1858,1785,1156,1193,2464,8],
  "0117": [895,202,1664,1055,1989,755,538,2059,2489,2165,1766,525,1553,177,1977,1352,1078,1683,892,1848],
  "0118": [2484,1188,51,587,1415,1629,1828,1421,905,207,1273,156,2115,2018,1259,6,1481,1001,1365,242],
  "0119": [415,1314,1836,2211,160,2056,562,547,819,168,1452,2229,2118,1012,2547,2554,1292,1924,1201,519],
  "0120": [579,2166,453,841,2585,86,9,1153,296,1523,2459,1950,2141,500,564,1730,589,1279,1516,595],
  "0121": [1816,1302,1217,1768,1349,166,239,617,729,957,227,2492,2238,1071,2295,2124,291,879,1614,1078],
  "0122": [1747,1388,2008,763,126,1555,2169,566,2565,946,1350,451,1057,1949,1235,659,319,1368,907,436],
  "0123": [380,1997,1051,19,518,805,1840,1497,1799,359,2482,1079,72,1345,1032,2145,2131,1654,553,302],
  "0124": [125,140,1449,1566,229,1634,899,1287,2592,332,1428,2342,1590,572,558,1981,2425,2188,2270,2475],
  "0125": [393,2130,2502,1564,2335,1233,303,1822,2,1424,1360,601,35,2572,165,946,659,887,2240,670],
  "0126": [841,2422,419,418,1070,104,2478,2349,527,119,2226,740,1397,499,1904,1404,2139,2051,14,1536],
  "0127": [1265,1637,997,444,347,2167,938,711,1589,1565,8,472,1802,680,1867,139,48,59,734,878],
  "0128": [1297,1728,695,1876,697,1481,305,2244,463,795,1262,2221,57,431,1656,1440,2311,2369,1820,416],
  "0129": [768,349,2443,2592,1066,1394,1539,1736,2509,1447,1995,1534,1387,122,24,2200,1852,1936,1070,885],
  "0130": [2439,2301,1767,207,1583,540,48,1008,1318,996,2478,1423,998,219,2554,707,552,437,210,1327],
  "0131": [1184,1577,1516,2226,2130,1929,126,1573,451,2109,592,1418,741,1390,274,1215,1042,1594,2459,2298],
  "0201": [65,838,1818,161,888,2320,912,788,1961,2087,786,2044,2072,411,1738,895,2189,1461,964,823],
  "0202": [1004,1383,981,2268,194,2016,1248,2406,167,952,1971,1053,1267,1162,524,2410,701,844,1193,461],
  "0203": [1563,582,335,163,1993,1170,1914,1748,1258,1457,1356,1717,135,1693,1428,609,605,766,584,1768],
  "0204": [1649,2506,799,2330,271,1235,545,633,360,1340,1100,1888,2291,2225,596,2582,2163,1229,693,1648],
  "0205": [400,2260,870,2375,1739,237,717,1864,422,1827,1661,206,986,1329,889,1752,187,684,2367,7],
  "0206": [2332,431,1531,1965,2077,739,1091,1688,682,1716,1247,1250,1124,815,2161,1095,2092,633,1665,2322],
  "0207": [2154,863,1143,439,952,2417,2430,1698,613,599,2286,704,1085,1588,33,356,889,318,1948,2258],
  "0208": [1741,530,1061,1817,464,1353,168,1299,967,903,502,451,1154,411,2378,1539,2004,2052,1857,2564],
  "0209": [2173,2235,2057,1167,81,620,1227,1612,14,2286,2211,1051,1616,156,152,2141,1119,1819,1018,769],
  "0210": [21,1064,662,144,1727,1344,1163,912,1599,26,2148,1788,117,835,978,127,1848,2030,730,2416],
  "0211": [732,1649,1117,1895,484,2124,1050,752,1292,1261,422,1836,1039,2137,739,266,603,2276,322,2433],
  "0212": [1323,71,1650,2324,596,1966,1974,528,2068,2266,33,2352,2281,671,1450,1204,504,1952,223,1415],
  "0213": [2437,2364,95,1084,938,1058,2345,82,1832,496,865,1954,2192,1416,1091,880,1794,812,458,78],
  "0214": [2059,1288,2040,149,2113,807,926,315,1691,1742,713,594,804,415,1926,404,718,511,1274,1439],
  "0215": [2333,2517,2282,1853,738,2141,2499,438,1458,1482,2257,2465,2346,1335,1030,648,455,1648,1646,1226],
  "0216": [1352,1764,702,1071,2355,1829,2050,1232,1910,960,895,1218,1720,408,2502,1565,1995,725,2476,1494],
  "0217": [1935,1080,35,743,1363,731,1785,1545,556,351,82,2210,2329,1002,260,14,1037,2471,44,1301],
  "0218": [1497,125,2350,2088,1410,785,1479,1708,287,2190,614,436,414,1329,1782,1984,1308,2145,2001,453],
  "0219": [2221,2139,2000,2182,92,1532,1599,1964,2401,1140,1134,2590,1508,808,2023,355,2292,827,2144,1321],
  "0220": [390,162,624,1771,1369,2040,1450,847,641,2202,371,101,1451,1065,1558,318,704,1934,351,1205],
  "0221": [487,1089,630,1848,497,862,1219,1428,1896,1695,1693,589,155,1008,1294,873,354,2558,335,1266],
  "0222": [490,602,1563,65,1389,2514,496,1443,1009,1065,1082,2394,892,262,2281,2395,2121,2147,984,2045],
  "0223": [631,211,29,2408,1011,1292,889,1035,1767,938,429,1518,144,2005,561,377,2460,239,1050,1234],
  "0224": [635,1613,1154,2022,195,881,824,230,1250,379,1918,690,612,319,1952,1535,1665,705,1124,669],
  "0225": [1393,30,501,1387,119,1160,2181,1608,1058,720,1254,303,2008,452,250,345,264,1869,1324,67],
  "0226": [270,1140,379,427,1678,904,990,1292,245,114,1548,2527,445,1790,28,1221,676,1610,564,334],
  "0227": [756,21,2049,2073,2051,402,2468,1379,224,563,1988,2151,2275,738,917,2097,1757,1244,2301,2464],
  "0228": [324,240,694,1803,720,842,1888,1937,2107,1080,306,354,2335,662,990,398,755,617,676,925],
  "0301": [169,1952,2528,1343,2566,1010,470,588,747,2058,1301,1786,1867,2337,2126,2007,1690,228,1416,2587],
  "0302": [2436,1596,544,1662,2342,874,708,1826,1977,2348,955,444,768,173,362,1678,2164,2279,1535,2108],
  "0303": [990,57,394,1294,1377,1246,2141,2492,1997,322,1257,1177,156,1908,2172,1127,868,1373,538,212],
  "0304": [2057,976,1724,2440,651,73,1581,938,852,1478,2529,1981,133,1602,1695,1070,402,2082,2574,1794],
  "0305": [1356,1829,2146,2572,131,990,1178,2254,173,641,1431,2548,2596,707,968,353,2395,1733,880,408],
  "0306": [1450,965,2470,1311,1074,2147,1081,2559,294,969,311,652,154,367,2579,1481,554,635,2362,2564],
  "0307": [1472,1856,2163,156,2485,268,2264,305,1023,1640,942,429,2487,1470,1836,116,793,604,32,558],
  "0308": [798,971,657,94,1560,979,928,1665,1807,706,1258,1870,2253,2342,2330,1967,588,2556,238,2261],
  "0309": [2085,1043,814,1518,340,2070,986,1367,367,515,68,739,2262,2491,1140,33,563,646,1626,1588],
  "0310": [211,2523,2557,1686,1094,2048,748,1176,602,1546,1354,1282,976,307,1598,1903,1439,1530,501,778],
  "0311": [847,2192,2056,1407,1715,448,645,1051,1550,2477,2361,924,639,1891,638,1664,1479,1688,218,1158],
  "0312": [1110,1802,499,744,1921,1313,2211,1674,1078,2385,1171,569,739,181,2471,387,2210,761,1193,1114],
  "0313": [1851,487,843,594,451,1202,454,1284,2454,1939,18,2130,1043,988,1618,896,1108,2352,687,1160],
  "0314": [2356,1887,2157,2122,2400,1834,1382,123,955,1331,1212,1028,1461,517,966,2266,1037,370,1528,923],
  "0315": [2150,600,2320,2506,1073,477,1805,1543,845,318,1307,1371,483,454,224,2573,2026,1864,971,360],
  "0316": [375,1147,1691,687,1999,2146,823,1551,1202,1207,2326,1003,2202,1994,1048,282,1416,914,2132,435],
  "0317": [2399,1650,1123,1145,2408,2529,1225,1423,2410,809,2214,113,2467,1420,146,2267,1805,305,1845,511],
  "0318": [354,1822,2079,2368,739,1348,1540,654,1734,1728,2093,1925,432,159,226,1,996,1661,1570,2554],
  "0319": [1431,423,1159,2211,1346,752,1824,548,1541,838,1532,2113,2552,749,2594,1950,2574,522,718,1921],
  "0320": [790,1495,906,861,1411,2296,1068,1239,1368,2324,495,577,38,2454,395,202,1515,1612,2554,1757],
  "0321": [891,2476,266,226,1864,2568,320,705,1428,147,382,2364,587,1095,2349,2335,1622,1280,276,523],
  "0322": [1041,1932,9,1901,2357,87,849,1625,1997,1532,1047,351,556,303,721,1213,1768,963,3,810],
  "0323": [297,211,2421,876,2397,2192,1229,2382,1606,2319,996,601,164,591,1534,1137,2014,795,148,1913],
  "0324": [335,689,2163,499,2087,1537,449,1513,1371,2458,2102,229,1300,1343,2441,1154,655,963,448,2367],
  "0325": [421,105,2205,1131,408,735,2353,463,1344,848,1421,492,243,184,1368,1634,1666,559,1571,1749],
  "0326": [589,1744,2025,1806,971,560,2149,2319,73,1377,2285,2006,291,1760,76,2011,1878,1942,2556,1404],
  "0327": [278,2448,758,1804,1660,1871,20,925,1126,614,2185,2075,2537,151,877,1677,1575,170,128,2225],
  "0328": [2340,1019,1875,1056,1819,2059,833,797,566,1665,778,1961,376,1734,1489,1938,878,2392,1499,803],
  "0329": [588,1661,419,1215,1378,175,1093,1396,1670,72,1296,1123,897,2028,793,1624,333,77,2583,1104],
  "0330": [2508,1464,74,727,1488,1241,1383,596,13,2126,930,1772,409,592,1493,994,613,1295,1925,654],
  "0331": [691,1922,162,2295,1859,149,1285,694,2504,1693,1446,1366,743,705,1895,900,476,1274,1281,1198],
  "0401": [487,2532,2355,2121,1673,2553,1889,1200,1554,2342,2324,91,2264,1968,225,1518,741,252,2117,1882],
  "0402": [1854,1114,1089,1721,432,319,901,2016,1356,1705,443,241,2194,544,2293,572,1803,1967,2463,2300],
  "0403": [2587,2211,1863,1336,1389,245,2132,282,1988,35,2093,1529,51,956,2505,869,1282,502,1904,165],
  "0404": [389,1157,1664,1524,227,1807,2391,853,452,1418,837,2453,1817,1579,1925,2346,1835,2518,2052,2005],
  "0405": [1035,1601,1738,1751,780,781,1963,889,2111,1353,1238,80,890,1265,167,281,307,405,2494,1804],
  "0406": [639,469,1711,480,1961,1158,2075,891,2474,2588,294,1065,777,86,2328,1561,1715,2161,782,1630],
  "0407": [1201,431,1309,819,1327,360,2010,454,2189,1406,252,2550,1171,1946,2549,2061,1572,2238,2078,1369],
  "0408": [1265,1707,2404,2112,560,2299,2482,7,245,1467,683,1884,2322,616,1472,690,2538,1777,396,260],
  "0409": [770,2391,2244,1150,1372,192,1895,2163,2573,1245,12,2048,803,826,2314,2388,364,1318,1739,2547],
  "0410": [1974,2240,380,2305,1886,1923,2034,2138,1796,1653,1613,2404,1866,453,1433,284,1991,2226,729,2107],
  "0411": [895,636,1291,1374,1080,1961,1485,477,1510,2043,1468,1890,1872,2122,217,19,2488,1757,2170,1150],
  "0412": [76,1293,1663,1715,1507,1349,513,594,1487,459,1967,1013,1531,2411,837,983,457,2304,556,2172],
  "0413": [725,403,507,2184,2365,1225,366,1705,2598,1476,515,364,2469,770,1096,402,823,899,1481,1538],
  "0414": [291,46,2084,713,1501,1651,1432,2575,298,117,806,1807,29,120,2576,460,2450,245,1176,1216],
  "0415": [1092,2241,2281,118,2113,1016,1471,1091,325,1942,656,38,1280,1222,2347,2264,1754,1395,948,1974],
  "0416": [2471,1076,805,894,434,1491,185,1328,2476,13,1702,867,410,704,611,600,1581,377,141,2486],
  "0417": [1856,1166,1417,1650,665,406,1452,58,813,542,1477,368,2399,2426,1920,447,979,1164,2034,1700],
  "0418": [929,1428,1823,703,1590,877,405,2081,586,2596,562,478,207,78,50,1926,2268,1201,2285,3],
  "0419": [2347,708,1406,1588,1751,496,564,462,1502,2064,1553,1048,1075,1786,2058,518,2131,368,521,1030],
  "0420": [2421,1920,1868,46,1394,1480,687,2302,413,1065,1916,1166,1586,2280,2379,598,911,1422,211,337],
  "0421": [1427,2587,1892,981,1430,1249,447,716,234,2395,534,2096,1181,527,1556,1964,1925,1250,2347,1706],
  "0422": [551,1869,192,631,1301,1807,617,1496,1810,2221,1469,648,1853,2210,1466,327,2385,1148,1967,1536],
  "0423": [1153,1510,2084,766,824,185,1820,1204,1748,933,1547,1860,704,541,34,1054,363,516,1797,311],
  "0424": [2379,2552,2534,1885,2074,2391,2094,1600,606,1123,923,986,120,2050,1215,1676,2431,2060,2433,440],
  "0425": [49,250,1908,1841,124,1907,1252,813,1042,2114,1038,686,963,1356,1245,2525,1478,624,967,1986],
  "0426": [1737,1710,1960,2576,1562,1649,432,544,651,1898,1422,1569,1221,526,902,1367,1643,199,1464,2125],
  "0427": [1132,615,188,1661,1056,2128,374,162,1947,170,1640,867,1595,29,2225,1144,1116,1007,1658,105],
  "0428": [2069,1969,935,1750,125,1169,1700,511,1278,1855,261,402,2202,340,1018,1229,1405,337,274,470],
  "0429": [2496,118,871,843,453,1715,372,1212,120,200,2139,488,554,660,2325,1281,1139,2095,1029,466],
  "0430": [1777,2134,643,2412,485,1371,2282,1186,1631,1227,1102,446,2272,73,1026,716,1388,324,1200,995],
  "0501": [1127,835,1232,100,2517,1550,474,736,817,1780,1752,2441,1209,1317,1275,2120,284,1417,803,286],
  "0502": [1973,1770,1503,773,1249,569,465,962,1900,1261,1826,2504,310,2320,2305,1568,1794,671,409,1765],
  "0503": [1470,2166,274,1782,2368,584,981,402,2133,870,529,90,606,1258,757,2274,1322,1364,530,6],
  "0504": [835,2424,2449,82,165,1013,1008,1113,1508,2587,264,223,2315,363,1677,694,837,1627,2146,2370],
  "0505": [1924,2119,515,1056,924,2303,196,1158,534,617,2533,1752,262,951,279,432,1095,1883,479,1622],
  "0506": [1241,1928,598,834,656,1813,886,1238,106,1196,239,2140,642,242,1517,1285,1858,602,2519,1391],
  "0507": [1606,715,1518,674,2309,837,166,1636,716,2419,2377,2176,4,2218,1831,1930,2430,1351,263,1068],
  "0508": [178,2460,2337,94,1459,2142,242,362,2448,1923,786,105,2273,1146,853,2041,653,2241,482,2208],
  "0509": [1464,2372,2306,2508,898,2457,2024,1603,2447,858,2414,710,909,112,2000,2410,2117,1592,2405,2052],
  "0510": [1589,2193,2132,557,2389,217,907,2442,205,1168,343,1320,991,529,2595,2311,1886,106,1941,387],
  "0511": [1668,2156,1297,1825,1646,1577,978,1598,504,1777,408,1894,1926,1365,1433,2557,2352,1326,362,1000],
  "0512": [1811,2116,1630,770,1861,631,2210,1113,1244,2188,1904,1693,2364,1662,521,2117,2073,2485,1103,1440],
  "0513": [2286,781,1253,2361,296,656,381,2419,289,280,455,2176,362,100,524,2358,94,1826,1026,69],
  "0514": [2260,2346,1672,2477,1466,2451,1279,110,2465,705,1870,620,1503,1529,2584,897,2384,56,2524,1759],
  "0515": [1729,2544,2290,2494,552,1636,2460,282,2512,2276,484,568,246,1441,708,2047,559,1960,65,2193],
  "0516": [1211,1605,2398,324,806,856,2031,747,2480,634,809,26,1403,777,933,488,683,599,890,2550],
  "0517": [284,1732,1982,2520,2125,640,1715,158,1832,115,242,2368,2354,2040,1752,2155,1426,922,1786,1180],
  "0518": [1551,1275,66,1767,477,2457,1347,684,1419,2192,2156,1784,1825,419,2008,1824,2018,1214,234,1595],
  "0519": [1561,1801,1339,648,1170,2500,674,1930,2326,903,2357,1486,438,1913,724,8,844,1144,2011,735],
  "0520": [551,2181,1120,2227,2024,548,749,2533,242,3,2363,510,2151,1679,2501,1758,1135,2079,2111,2488],
  "0521": [1486,1125,1038,2053,2221,1879,1477,1291,1460,892,333,256,2257,1793,249,342,541,2035,518,13],
  "0522": [1672,1794,1957,2008,2064,2377,255,683,942,1338,2404,1410,945,1104,2322,874,2342,22,451,1628],
  "0523": [1252,2284,1559,199,2147,1232,389,1203,2011,1968,1417,2056,974,645,104,2517,1523,2031,1729,632],
  "0524": [696,922,803,1735,231,2211,713,2523,1710,443,1565,1137,371,177,2356,1035,1054,2146,1734,1352],
  "0525": [1383,743,1872,1758,1126,2088,1114,2099,2298,1182,2487,1537,234,1032,1825,1579,2462,989,1520,1571],
  "0526": [1352,842,1818,1198,1968,2223,1951,208,1424,1394,2315,609,70,1292,1751,2585,1763,288,650,1550],
  "0527": [1342,194,2383,1203,1750,1405,705,642,1937,57,361,113,1665,1917,1511,762,950,316,1519,2269],
  "0528": [1918,14,1662,1270,2081,2035,673,136,171,1084,1536,676,2115,1350,2504,1023,430,2217,186,2478],
  "0529": [1698,2213,2540,1325,1308,1782,1313,373,2092,970,2154,787,1908,1038,2361,1075,35,2224,715,850],
  "0530": [634,1609,742,1337,189,718,136,955,1763,1655,157,2210,2300,1135,2122,377,2093,1505,1361,1310],
  "0531": [469,1811,178,1943,1670,2279,876,372,1175,559,1242,2449,1245,482,992,2269,2250,672,566,940],
  "0601": [995,629,2574,1770,1336,956,83,247,2486,984,1157,2492,981,2580,1951,2216,455,2276,1429,77],
  "0602": [1999,549,1992,2476,1647,1504,835,1747,2413,1394,2334,498,2494,1997,1650,2161,443,451,1315,921],
  "0603": [51,121,959,1119,2522,913,1776,1924,1232,2058,279,1220,2512,1603,1101,2213,308,2268,1918,1648],
  "0604": [1974,107,593,411,568,709,147,2141,299,693,1405,1383,1896,1851,1666,1803,1920,1895,2005,1781],
  "0605": [529,747,1414,114,2589,1710,177,369,8,521,1277,1444,73,959,2319,2350,227,1404,327,1233],
  "0606": [2395,1839,2300,832,898,946,1745,6,1692,1192,1015,203,1262,2336,2050,2363,243,315,2567,1123],
  "0607": [2586,1128,2072,2583,734,828,365,585,2230,2185,573,1896,277,757,2027,258,1825,469,2208,1944],
  "0608": [1257,1248,836,121,1506,1846,1636,2067,60,1377,1925,1436,2390,1868,2228,159,348,2271,587,218],
  "0609": [1330,2318,84,1202,2261,2499,972,1780,299,298,2496,389,938,2438,1443,1150,1627,438,2142,1333],
  "0610": [818,326,2176,1759,725,1120,2442,1888,64,1788,703,1361,2217,2509,154,985,799,1267,1985,521],
  "0611": [1123,946,2150,2298,1494,105,1456,1926,1117,228,450,174,982,2549,591,1745,1975,266,137,1772],
  "0612": [2400,915,1788,2594,1391,1312,1376,85,1357,8,1693,480,1661,2207,81,1631,2176,2248,1858,894],
  "0613": [1807,2575,1254,2564,2074,1103,1337,863,1837,79,2042,185,2282,404,1415,82,668,963,1434,760],
  "0614": [872,2550,849,1698,415,154,971,1451,116,1188,273,1683,2381,1707,1144,2481,2033,2581,1815,362],
  "0615": [1453,1323,400,652,893,1415,2588,1264,463,1816,650,151,2240,431,1012,1236,1841,746,2,550],
  "0616": [2275,2472,954,625,17,1889,2368,1382,2369,1434,1956,420,23,1163,1276,1304,341,736,514,276],
  "0617": [339,1479,2249,1898,1338,1632,661,2111,2352,902,451,63,262,293,1039,1199,1376,1423,2014,2349],
  "0618": [1950,886,789,527,811,1759,2026,2588,2427,775,2158,1930,1897,2123,1968,1677,99,932,1997,2011],
  "0619": [1869,2084,1966,1877,1600,754,1077,1202,212,1288,1746,1912,220,1378,1889,1175,2565,400,175,2355],
  "0620": [2222,1537,643,706,2499,776,1648,381,152,1043,1126,2588,2048,430,1194,1986,23,416,1657,2083],
  "0621": [2334,357,2207,519,1396,2403,832,1286,816,2424,443,2163,2418,230,757,1306,1972,1178,2231,1003],
  "0622": [966,1105,2558,2532,1370,1212,50,212,2230,1208,4,1704,385,1294,1670,1606,468,675,1886,2089],
  "0623": [460,1639,1386,907,2249,17,1620,1475,2444,2591,2451,133,1597,1882,1828,2237,1611,1215,21,1638],
  "0624": [1108,1775,909,1683,1913,383,2355,912,1275,1095,1704,789,1085,544,1565,2204,1720,177,140,650],
  "0625": [686,104,13,735,1836,2164,386,1717,2139,1019,2082,1158,934,1332,727,1546,775,1286,1243,1263],
  "0626": [868,1337,533,1242,86,630,487,232,2468,2553,155,748,1344,1576,1376,507,1409,919,279,2012],
  "0627": [312,1874,1034,728,624,543,2439,733,2548,1104,273,2064,1105,404,93,370,1769,280,597,2132],
  "0628": [1257,885,673,916,1763,66,301,2068,1541,96,2281,10,635,2383,1236,2014,529,2576,2236,818],
  "0629": [1177,763,463,1430,1435,1196,711,968,2490,1834,461,881,863,1007,1612,2568,1909,776,1365,2487],
  "0630": [1806,1914,356,1133,1402,924,1020,5,714,2086,1468,1813,1649,388,684,1160,2432,1941,174,724],
  "0701": [834,1752,146,1457,1805,1025,1389,2295,2140,2578,2073,2122,245,705,1184,2161,1533,2240,561,154],
  "0702": [2553,761,1479,2380,172,416,121,640,1882,142,1074,1500,2261,1347,808,1334,229,786,1695,1948],
  "0703": [545,1836,1774,1797,938,825,1489,192,1538,2331,472,2216,1568,1657,797,2267,2386,115,993,815],
  "0704": [1741,1123,2453,1672,803,1287,2485,895,2066,1320,375,2001,2513,2565,1713,1754,1881,247,892,1910],
  "0705": [956,209,1416,791,393,2098,2541,2555,2199,2582,1923,811,1743,1019,1536,2167,1784,1411,236,32],
  "0706": [64,776,28,2239,2255,217,2105,2560,686,363,2002,2371,914,1680,2099,1524,2417,1826,2008,2498],
  "0707": [673,1849,1492,1461,1400,899,1944,243,705,2330,358,1487,1030,112,1150,192,488,53,391,1145],
  "0708": [1877,2026,2486,33,2146,1421,2385,2505,1423,363,1293,339,2236,2515,90,1291,2278,1646,1583,2414],
  "0709": [264,1083,2292,209,2129,1124,875,2339,855,2187,2202,734,1908,922,1730,2360,2498,95,205,513],
  "0710": [294,492,2518,1500,1996,610,1847,582,1243,1298,649,1767,2300,1959,2126,1672,1679,1137,937,2251],
  "0711": [890,1613,2485,2369,1654,452,106,809,518,173,924,2117,2278,1415,1287,1071,1146,2271,2016,463],
  "0712": [70,1750,248,505,1483,805,631,2029,1310,1174,374,594,1864,988,910,2129,1104,1729,1810,2090],
  "0713": [777,2317,653,2206,2158,1815,2503,1271,1774,466,1794,1075,1099,2557,2277,2188,1692,649,1982,1204],
  "0714": [2111,1353,386,2102,571,1726,1310,2584,1653,1288,879,313,856,1761,1703,2173,766,43,755,743],
  "0715": [130,188,827,1624,345,1638,2097,1998,1603,1882,1913,729,2304,1391,1969,82,1281,740,265,111],
  "0716": [252,2553,484,1344,55,2515,650,1528,1059,2192,407,2000,1899,1458,2364,2145,1745,1138,1990,1747],
  "0717": [528,293,1341,2040,721,607,2306,1378,203,521,2169,1188,1078,1908,1129,1790,195,1268,193,694],
  "0718": [439,1109,307,1149,1207,2445,270,866,1712,1115,1634,166,2213,43,87,621,936,2246,2497,808],
  "0719": [579,433,1258,122,712,1490,1082,931,1006,1880,2545,2179,2305,233,1770,618,1268,11,992,113],
  "0720": [418,1633,918,993,2022,2553,1312,2213,285,2400,1593,1327,1720,467,1431,1294,1572,1916,1223,1412],
  "0721": [1805,1194,194,2383,2536,898,167,1829,2189,824,2190,1315,1416,1516,323,1680,87,988,2443,2528],
  "0722": [1821,296,2134,662,93,456,17,1364,1291,488,2093,99,580,570,1209,779,716,1153,2252,1898],
  "0723": [2036,368,1881,1871,1930,1914,1749,675,207,880,877,1895,1095,2494,2015,2405,1352,2351,921,1202],
  "0724": [789,1757,1970,2397,1467,1545,884,2143,589,1841,2356,2254,1072,1978,723,1105,356,2558,1127,2440],
  "0725": [2457,2302,1129,725,2501,1522,513,1952,640,1087,2019,1452,1594,1358,357,106,710,2153,821,194],
  "0726": [78,1678,116,2282,1141,60,1239,242,2097,343,1420,2135,814,1249,1349,789,994,1836,1690,1849],
  "0727": [1753,2393,2217,2276,2360,709,1938,1461,2037,602,278,1050,1475,2295,1280,1877,71,912,2307,1810],
  "0728": [136,1157,2232,1892,2438,1121,1558,1705,290,785,2549,121,442,1059,989,874,1290,673,1778,1483],
  "0729": [451,1498,1406,1424,337,2571,2152,574,1051,2220,648,1356,1349,1491,1102,2260,1521,2338,118,1341],
  "0730": [33,1108,167,1159,2553,991,970,1099,1022,918,307,2414,2070,1923,635,1959,2179,1211,822,2565],
  "0731": [199,1534,2490,2194,2034,965,2018,417,1026,2182,2190,1037,1128,2495,720,430,247,1637,2101,866],
  "0801": [2295,2111,2341,2561,2226,2278,2401,215,177,1218,190,2170,241,1283,2293,501,1834,2344,1065,1217],
  "0802": [504,1195,2395,2288,1104,1117,1798,282,2369,2091,1724,934,448,58,1369,2017,248,1998,293,2396],
  "0803": [1620,1192,854,2513,528,2455,287,2384,1365,2108,2531,1284,826,139,749,881,2566,1890,1664,2086],
  "0804": [2564,617,2182,1857,2486,651,1726,34,403,1719,599,698,690,1258,1427,531,2451,2587,1825,2227],
  "0805": [1222,1333,340,2590,2083,174,310,1687,678,1497,2031,2404,2168,805,1632,375,612,737,1464,409],
  "0806": [1128,2385,2335,2229,944,172,87,934,1542,374,262,2086,2426,677,1847,278,1030,1742,645,1283],
  "0807": [2234,1848,1194,1386,2177,545,1385,2249,2280,2296,50,2560,1444,719,2372,1967,2498,2575,238,1286],
  "0808": [1068,1906,871,1496,2213,119,1079,2337,1898,195,543,48,763,1696,1913,1673,775,1408,1172,2112],
  "0809": [2474,1468,2440,492,1333,1554,856,225,1048,2050,2587,1338,1244,300,168,813,1507,1169,755,620],
  "0810": [2433,2301,1357,2019,1605,2195,1993,2434,1314,1243,721,1217,1109,1852,2458,1955,2484,11,249,2378],
  "0811": [409,1924,1992,1739,1305,1991,308,484,2417,571,2285,1324,2580,1900,918,1802,2547,1330,55,2555],
  "0812": [1686,1029,459,1783,2068,395,2486,1191,1576,1897,685,1224,1788,2194,479,2365,916,609,2250,1647],
  "0813": [1879,769,81,2419,45,2418,520,1108,226,692,697,1761,1957,1308,1013,1619,261,424,109,2001],
  "0814": [1659,2169,1208,99,666,2401,179,360,1975,1988,214,1856,1033,1973,1817,2303,199,493,948,2382],
  "0815": [1978,1218,1562,893,1837,1437,1069,806,1884,1563,1379,74,2072,1302,2297,1369,562,1960,475,712],
  "0816": [2329,1909,1902,1554,639,935,2570,1073,1170,934,1078,1050,1923,1120,2075,64,2395,143,542,285],
  "0817": [1500,239,1570,2448,522,1424,1297,264,752,2509,739,2040,1730,444,1663,2599,2325,2371,2292,1920],
  "0818": [2456,813,1880,1717,1957,1698,1090,1157,576,659,195,431,1165,1853,1917,1327,2112,2471,2164,626],
  "0819": [1516,184,2104,1049,2183,358,2350,2426,2410,1551,636,2486,2294,522,1351,2581,691,307,261,40],
  "0820": [121,1178,519,577,498,257,2199,1138,595,788,1076,1988,1212,2281,1544,191,1777,1926,1922,1973],
  "0821": [2109,2396,161,1095,1257,277,1423,1220,279,2428,2021,291,2599,1748,1841,2086,1835,1743,2172,2447],
  "0822": [3,812,1447,835,2040,362,2409,1994,179,1501,910,2239,690,1254,972,1914,303,1701,236,1267],
  "0823": [872,1378,1165,28,1510,676,1968,1167,873,631,2154,677,1808,642,2204,1613,1199,1765,634,359],
  "0824": [123,2331,2347,303,1195,1560,2506,275,2536,1017,1774,27,1260,2419,2260,2249,1536,2384,1300,69],
  "0825": [1952,2202,1002,960,703,2166,2053,698,506,716,2210,2004,1279,654,224,1057,346,1914,460,1341],
  "0826": [156,556,836,1650,1797,2364,1592,2363,1557,179,1062,37,220,1334,1784,2350,2541,1785,2323,1281],
  "0827": [1242,813,1856,474,269,1895,1922,1846,692,1844,375,466,447,666,2192,2123,2386,758,36,1582],
  "0828": [2387,251,2210,2010,799,2009,780,405,2447,1728,2212,694,2083,460,1219,1404,1202,1499,1906,257],
  "0829": [1134,1706,550,549,2147,506,1409,509,1733,109,1661,2227,1941,1258,1651,1830,419,2261,2260,507],
  "0830": [826,1104,964,1702,183,1260,2093,1171,33,1666,2599,2388,2101,583,164,66,417,410,1191,1492],
  "0831": [808,1117,1607,65,101,984,1750,2298,758,30,341,1096,902,941,290,547,2445,87,247,213],
  "0901": [356,1578,2278,216,418,1587,472,2246,750,572,1707,1403,583,1509,1805,2238,2458,1752,496,1094],
  "0902": [558,237,2052,1119,150,1384,1052,619,2098,878,2369,1474,1498,1461,2398,2455,416,1631,1687,2411],
  "0903": [1442,22,2339,879,1526,496,2315,1428,1686,174,2095,2323,2307,976,340,1478,1064,508,2047,1040],
  "0904": [2456,1763,1506,1734,2384,317,1401,1104,1642,1157,2596,659,1481,2523,1855,1059,2486,2334,437,1532],
  "0905": [2593,661,615,1270,1466,443,373,1239,266,2185,1249,2502,2144,1351,37,32,556,540,2544,1795],
  "0906": [1210,1677,1303,1059,655,2599,2003,1424,1029,1412,1261,1674,268,131,43,1342,2285,1809,1257,76],
  "0907": [1568,428,511,1980,2098,1864,2364,2102,2540,12,1868,1368,2225,1588,1005,2538,2511,527,2072,1687],
  "0908": [2229,119,2386,1562,829,2150,2557,520,2393,452,1894,2589,1600,1253,1169,210,6,670,1685,2390],
  "0909": [1256,1503,891,1093,149,2117,678,1348,2584,1687,630,250,127,736,1521,2152,194,719,2270,887],
  "0910": [1971,612,458,484,1667,1690,1339,1934,681,1739,1986,2538,382,1509,1626,2297,258,80,1962,792],
  "0911": [246,2378,2232,2068,493,2035,890,200,1827,1075,1635,68,1713,1082,499,1448,797,2454,96,2010],
  "0912": [1982,2174,730,1437,1600,1550,846,1776,1636,1298,1345,1975,2031,395,2572,966,1169,1624,235,2038],
  "0913": [2307,32,254,2477,2472,319,2040,2245,1125,1665,1562,1811,171,2194,783,168,1907,456,2469,374],
  "0914": [2034,615,440,959,2191,1691,2,2384,2555,2009,1283,37,1099,2218,507,2295,1991,2538,1275,1453],
  "0915": [648,360,874,1023,2462,441,1805,2015,262,2109,523,1608,2100,892,1941,2030,1149,1864,685,160],
  "0916": [663,2488,1256,1583,991,923,408,1488,2588,1316,2378,247,1309,743,1473,1762,1481,832,776,40],
  "0917": [1528,2403,546,479,1760,871,2559,2451,2204,1247,11,2201,1179,2230,84,539,875,2070,512,1793],
  "0918": [359,2020,2027,2564,1225,246,309,1520,893,2103,794,849,2582,414,2330,1805,2528,847,1272,2150],
  "0919": [1736,2105,1723,1221,1027,1018,880,320,2317,448,590,556,12,1056,1233,1104,1022,1454,840,2054],
  "0920": [2163,1469,2319,332,2394,1331,340,1228,1986,361,1685,543,807,1379,1172,1499,1772,312,158,1676],
  "0921": [449,133,67,901,1955,1852,848,1556,1719,51,1247,57,1464,416,483,509,1392,2409,2469,1528],
  "0922": [1834,1218,2458,48,305,1496,1158,2394,1224,1752,161,137,1030,845,448,1300,2140,2313,667,1643],
  "0923": [264,1818,572,881,1555,674,1273,993,2380,548,649,641,1627,2391,372,1135,173,1469,2328,1784],
  "0924": [1687,1284,2398,1764,2302,1867,532,2349,538,507,43,182,1603,2150,1332,336,1416,812,1294,876],
  "0925": [1579,1548,1022,1007,1822,1183,177,2560,348,1657,2442,880,407,2283,2567,1762,270,99,1101,1448],
  "0926": [42,1540,404,1942,1006,813,1699,2378,31,151,1166,456,2014,1509,1931,1423,1893,2407,2263,1654],
  "0927": [951,2505,597,247,60,47,2240,104,66,630,649,1812,2118,718,1462,573,818,1034,24,191],
  "0928": [151,899,1178,637,1521,1352,83,1367,1056,2337,830,2387,1190,21,1597,77,76,704,689,765],
  "0929": [1498,984,492,2343,959,1591,432,1568,1353,1461,2396,1769,288,2494,1908,946,912,1986,1143,1584],
  "0930": [1824,2316,872,372,2309,1045,500,1581,990,471,325,1073,862,1690,2433,1739,1095,384,131,704],
  "1001": [108,1278,2274,1654,2290,132,1153,210,2263,1612,2241,511,1652,727,2252,682,333,2524,2588,2535],
  "1002": [2049,442,2259,2451,272,760,663,545,1201,629,990,2156,635,1959,2352,2313,2249,81,1403,1080],
  "1003": [2399,499,30,2472,458,958,1029,1151,414,2517,2288,1380,901,1725,1217,1009,554,1974,405,1936],
  "1004": [2123,899,1376,534,693,2010,1578,125,162,809,1992,2299,2406,608,1996,1585,2172,2238,381,2445],
  "1005": [368,970,1022,2417,519,604,1144,736,2492,1091,2180,786,2303,1482,680,622,2006,2151,1835,1526],
  "1006": [1966,2112,2093,2166,2000,2498,437,1311,1745,1741,1237,2449,1368,550,795,2019,2253,1648,859,1020],
  "1007": [74,23,436,1686,604,71,878,1929,1050,2353,1088,1791,2177,981,929,557,1748,101,1135,1763],
  "1008": [1756,1849,73,1953,207,227,1204,171,1175,1250,2018,450,1332,465,1771,859,1851,2487,1347,397],
  "1009": [347,602,1239,2229,2334,56,552,1423,2428,1194,888,2510,1963,1263,1052,472,1286,281,423,509],
  "1010": [2492,1113,1901,11,2588,5,1921,1590,2562,1081,1737,1557,2462,902,69,2304,1791,349,1140,1635],
  "1011": [1358,117,1139,2460,1549,270,235,1146,599,534,2296,708,873,2124,265,1591,128,796,2217,2527],
  "1012": [1968,487,1306,151,2417,1770,631,426,663,587,2132,548,983,435,1212,2243,1193,1521,148,2347],
  "1013": [1564,2145,1210,2451,2134,1685,635,999,814,1793,2555,207,1334,2550,1674,2439,1106,971,2364,569],
  "1014": [2484,605,1130,1736,266,392,511,1702,982,2566,1377,2497,1557,1805,238,1343,1375,58,1748,1079],
  "1015": [383,2179,2196,549,1889,365,1031,1253,1363,2369,1017,2135,1895,1049,539,1392,1480,1045,1366,2068],
  "1016": [2119,266,1849,2485,103,1157,2576,2315,2005,782,929,2419,1079,1381,1165,229,2073,554,30,0],
  "1017": [2237,690,2289,2442,2433,2335,1101,1474,951,430,2403,240,1514,80,446,940,1602,2336,1790,1970],
  "1018": [997,753,1182,732,2129,2566,1284,950,1492,1232,958,616,659,663,375,989,84,2078,603,1298],
  "1019": [870,1363,679,2202,125,1980,768,793,1173,2511,1239,2096,991,1103,1140,1223,53,251,1329,1902],
  "1020": [1556,50,469,1126,119,1300,846,1888,1374,2325,2367,1643,2056,971,2316,2502,1720,1610,416,1052],
  "1021": [96,1356,167,2415,644,885,2500,1135,308,2117,261,155,758,311,1455,2576,1522,2525,1704,2135],
  "1022": [1434,2028,2570,1967,2219,745,909,189,306,929,1191,240,1447,83,133,607,80,2338,1184,1412],
  "1023": [119,1707,556,647,227,749,2148,0,1337,857,516,581,1163,521,241,1631,290,2484,1701,1955],
  "1024": [912,464,728,1478,1074,1942,1004,1982,2360,1093,2030,382,1352,329,325,834,1363,2363,2082,190],
  "1025": [25,683,979,1606,906,2131,505,2332,51,1857,932,693,1275,377,1108,1265,1671,1901,1746,357],
  "1026": [2253,2155,1456,310,690,1264,199,1761,1949,2103,493,800,920,945,2111,806,573,1307,2068,1312],
  "1027": [1106,2575,527,1944,1449,1231,104,1043,2519,1785,1798,914,354,1810,722,99,775,2172,926,1901],
  "1028": [2115,246,422,73,2238,2521,1674,46,1321,362,1826,2416,1055,233,539,215,1613,1583,95,1636],
  "1029": [761,174,2544,200,2415,741,2375,1998,1598,2426,2298,1691,333,39,1542,665,2435,830,2185,2063],
  "1030": [1215,727,2399,606,95,1102,1139,961,746,1983,1676,1650,1069,965,724,2430,1302,1612,2556,2459],
  "1031": [3,180,2041,1984,1690,1289,1099,922,798,490,2326,711,598,1623,2354,2220,740,1390,1309,2463],
  "1101": [946,21,1450,1756,428,2253,2339,1213,899,1123,1009,2430,773,2538,485,2155,1916,2362,2449,251],
  "1102": [1598,1868,272,1775,2041,1609,1314,1918,1055,2247,1326,141,1874,1444,173,2569,1498,1980,2383,275],
  "1103": [593,2236,2206,32,643,2199,30,1739,338,2326,1942,531,2163,2232,443,1972,39,2064,2119,802],
  "1104": [843,895,711,445,2299,1679,1654,977,1339,1725,675,2051,81,2425,637,1825,2201,1426,2372,2057],
  "1105": [1966,1518,1659,2507,2431,1805,547,1433,2408,1092,832,2246,753,1418,1438,583,2095,1580,1985,319],
  "1106": [1183,1729,2047,2242,714,525,20,1847,1010,1298,998,1386,1711,195,795,2530,1095,22,1758,380],
  "1107": [810,538,1929,2445,2200,2438,62,2350,417,852,1001,1491,2033,1573,1266,948,159,472,338,2073],
  "1108": [157,1360,643,148,1786,1646,702,918,2009,493,817,296,1814,2506,1204,1064,977,1187,233,1883],
  "1109": [1445,1498,1577,2399,101,1418,1605,2357,1471,1552,1472,1145,191,269,2561,1697,718,1312,2158,2105],
  "1110": [866,1023,807,547,2411,2328,496,1244,1768,2027,1505,1639,587,976,1749,584,2446,1917,1428,2383],
  "1111": [1767,392,877,115,220,1672,1424,1138,1985,1281,1094,2151,1925,1288,595,2432,1092,540,1430,646],
  "1112": [1274,2068,1921,842,483,694,945,173,663,1438,1089,1222,2367,612,1451,850,2220,1942,2550,2376],
  "1113": [122,311,331,177,1534,1225,1097,1326,1562,2447,1469,1343,547,1502,1687,1086,1190,2474,144,2458],
  "1114": [1742,1000,1422,202,469,2065,210,737,412,2259,2374,271,411,1347,454,1986,543,667,2431,619],
  "1115": [529,2375,785,1897,2022,1632,264,2450,43,2412,638,2245,2448,60,1592,503,1991,78,1311,2425],
  "1116": [1342,1022,2356,1518,647,1973,1661,168,1385,751,1864,864,1638,2259,548,637,1769,1430,2246,2300],
  "1117": [1018,313,923,1339,764,1960,905,2569,1791,684,255,2519,804,606,2178,91,990,233,2554,757],
  "1118": [463,1553,1145,1046,594,1465,1109,2287,1811,424,995,1100,979,1751,1310,977,78,563,629,1070],
  "1119": [2167,1457,276,1983,872,2487,647,2406,611,1589,1551,2413,228,927,1316,470,1133,2022,413,858],
  "1120": [742,411,1011,755,2559,2086,2216,1262,2134,425,1233,1088,1846,1845,2318,1365,378,714,2343,604],
  "1121": [2156,2231,2063,887,2203,918,1108,1226,1725,1119,445,1342,299,1543,1498,2591,929,2378,1833,2246],
  "1122": [845,2408,2173,1381,1130,1237,99,891,930,2089,2543,1324,1845,1093,872,1952,1804,2343,1251,1831],
  "1123": [516,1510,2450,450,839,591,191,2087,719,2446,655,1328,1588,34,632,1227,1114,2586,857,350],
  "1124": [1985,1191,2466,2392,908,717,523,867,196,185,301,2408,1374,1788,821,1034,1244,866,1751,1627],
  "1125": [1674,637,2030,1144,2444,386,2168,2038,1890,2276,1672,1296,484,2072,2003,2231,30,1731,234,2083],
  "1126": [2041,149,1280,2122,751,2423,721,1525,2026,2317,165,2200,2286,1849,2266,1301,2342,1022,1852,1155],
  "1127": [692,869,1069,975,122,1473,549,780,1084,1502,503,816,319,2302,2323,281,802,2147,1353,1875],
  "1128": [1208,223,525,2257,536,52,517,923,157,1925,651,125,2441,1936,590,1691,874,627,423,673],
  "1129": [2537,211,580,2517,692,1170,819,1678,1352,2349,2447,1442,2016,1584,845,973,2518,1369,237,1147],
  "1130": [1627,349,1324,229,1687,1424,362,1960,302,140,772,1612,131,862,2334,2265,2429,2487,1759,397],
  "1201": [1001,579,1949,2275,589,328,2088,1747,743,515,1706,1539,2158,1891,2213,385,271,1091,1211,157],
  "1202": [268,854,808,423,1674,675,1960,1646,914,1371,1304,1055,1366,234,1462,1236,2247,2296,1374,1628],
  "1203": [2248,538,2017,216,1743,2504,1504,1872,919,576,2500,26,52,1802,2202,279,785,2041,1726,2300],
  "1204": [1338,922,1003,973,2595,790,322,1112,2460,2222,1313,1759,1676,1515,13,130,257,160,1900,1485],
  "1205": [2217,1596,2590,905,1364,2336,1417,2205,561,168,634,1914,427,1077,1261,2346,2152,2024,1096,740],
  "1206": [2080,659,507,2224,1085,910,1723,2399,246,1121,2229,2211,2070,1581,468,1923,945,2593,1809,2209],
  "1207": [1823,134,2429,520,1543,705,2152,2428,2323,1758,1696,1020,310,2098,1456,173,647,1423,1928,1042],
  "1208": [813,1921,2184,1742,105,1295,2522,73,2268,2069,1582,1227,2074,42,244,1125,2432,2498,871,1577],
  "1209": [821,517,853,1041,2515,1422,1483,590,277,2583,2128,1032,2233,290,375,730,1076,551,2146,1684],
  "1210": [1318,2043,1197,198,1281,1446,1418,430,696,547,1366,2390,2004,2458,2208,188,1017,614,1742,1686],
  "1211": [994,2024,1159,1644,1612,358,638,1604,1976,1989,2468,2459,1501,1743,1263,777,2137,1011,1659,945],
  "1212": [2237,509,1271,1250,1710,2461,2284,1474,601,1129,1758,1170,1441,2233,910,1381,1444,1299,946,900],
  "1213": [1790,1851,1088,2261,1066,229,1344,1826,381,978,2225,1912,2156,1442,236,1497,1180,2554,1945,1131],
  "1214": [701,2008,1867,80,609,1520,2201,2114,1470,2479,1287,654,1749,507,1874,469,641,405,2221,1247],
  "1215": [1048,2573,326,1339,961,1671,1820,213,2135,281,915,425,2118,1819,1248,475,1896,393,1524,2505],
  "1216": [2007,175,776,1737,1083,2448,1720,127,2048,2273,2116,2569,2293,1160,203,1507,562,2408,2461,1178],
  "1217": [2585,38,2459,69,80,2519,1686,219,1311,1419,418,2063,715,1418,2276,2544,273,2381,2587,1993],
  "1218": [2167,2437,186,874,1699,1259,1138,48,2300,1012,414,2320,2112,1974,1584,1714,401,2139,1248,1078],
  "1219": [759,2268,1828,130,1032,827,142,1640,405,1066,737,909,2306,1844,638,446,2495,1448,143,566],
  "1220": [1444,2139,1189,562,1320,844,2330,2425,680,885,2036,1165,189,894,801,879,1930,2141,1434,1682],
  "1221": [468,521,1525,2551,1269,2160,302,418,1250,1690,2155,497,2274,366,401,1149,1336,926,2138,2296],
  "1222": [338,1376,2022,1649,706,2587,1762,185,1893,313,2534,1484,1794,2486,1284,1367,2204,745,481,19],
  "1223": [1248,2188,144,2505,27,155,354,2528,1621,2575,263,629,1531,289,1411,1073,1467,1263,543,1254],
  "1224": [310,1562,1821,2141,1924,1718,2101,340,1165,278,641,1762,2562,971,1632,577,1698,864,948,540],
  "1225": [545,369,1945,1511,1192,437,2157,1664,2253,771,430,1715,2029,1240,1484,760,616,1363,1889,2418],
  "1226": [954,1325,1641,1517,1794,1892,2264,2578,1338,333,2360,1803,1957,1157,506,773,1173,2134,368,1431],
  "1227": [223,403,346,2557,2275,1385,1208,15,1663,1342,67,2016,170,107,916,189,2154,624,729,1011],
  "1228": [2157,2563,1624,466,1887,824,186,214,2559,326,355,1228,521,999,11,639,2164,1320,1742,527],
  "1229": [255,2489,1294,476,1009,1432,758,2422,1570,281,2483,992,1797,2380,244,1340,291,1642,1202,2347],
  "1230": [2355,1465,540,1466,412,1300,816,744,2542,1622,2329,1174,2210,1608,335,2052,2413,432,2273,268],
  "1231": [2520,2278,514,11,275,2103,292,692,2405,2201,76,108,1998,1789,1730,1298,2054,1772,2349,770]
}