CREATE TABLE charityInfo(
    id int,
    EIN int,
    /*charityName varchar(100),*/
    TOTAL_REVENUE double,
    TOTAL_EXPENSE double,
    
    PRGM_SERVICE double,
    OVERHEAD_COST double,
    RATIO double
);

LOAD DATA LOCAL INFILE '/docker-entrypoint-initdb.d/nonProfitCollapse.csv' INTO TABLE charityInfo FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS;