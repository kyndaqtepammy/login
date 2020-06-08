SELECT
    (
        CASE WHEN(
            DATE_FORMAT(NOW(), '%Y') - DATE_FORMAT(date_of_birth, '%Y') -(
                DATE_FORMAT(NOW(), '00-%m-%d') < DATE_FORMAT(date_of_birth, '00-%m-%d'))
            ) <= 20 THEN '1-20' WHEN(
                DATE_FORMAT(NOW(), '%Y') - DATE_FORMAT(date_of_birth, '%Y') -(
                    DATE_FORMAT(NOW(), '00-%m-%d') < DATE_FORMAT(date_of_birth, '00-%m-%d'))
                ) <= 25 THEN '20-25' WHEN(
                    DATE_FORMAT(NOW(), '%Y') - DATE_FORMAT(date_of_birth, '%Y') -(
                        DATE_FORMAT(NOW(), '00-%m-%d') < DATE_FORMAT(date_of_birth, '00-%m-%d'))
                    ) <= 30 THEN '26-30' WHEN(
                        DATE_FORMAT(NOW(), '%Y') - DATE_FORMAT(date_of_birth, '%Y') -(
                            DATE_FORMAT(NOW(), '00-%m-%d') < DATE_FORMAT(date_of_birth, '00-%m-%d'))
                        ) <= 35 THEN '31-35' WHEN(
                DATE_FORMAT(NOW(), '%Y') - DATE_FORMAT(date_of_birth, '%Y') -(
                    DATE_FORMAT(NOW(), '00-%m-%d') < DATE_FORMAT(date_of_birth, '00-%m-%d'))
                ) <= 40 THEN '36-40' 
        
        WHEN(
                DATE_FORMAT(NOW(), '%Y') - DATE_FORMAT(date_of_birth, '%Y') -(
                    DATE_FORMAT(NOW(), '00-%m-%d') < DATE_FORMAT(date_of_birth, '00-%m-%d'))
                ) <= 45 THEN '31-45'
        
        WHEN(
                DATE_FORMAT(NOW(), '%Y') - DATE_FORMAT(date_of_birth, '%Y') -(
                    DATE_FORMAT(NOW(), '00-%m-%d') < DATE_FORMAT(date_of_birth, '00-%m-%d'))
                ) <= 50 THEN '46-50' 
        
        WHEN(
                DATE_FORMAT(NOW(), '%Y') - DATE_FORMAT(date_of_birth, '%Y') -(
                    DATE_FORMAT(NOW(), '00-%m-%d') < DATE_FORMAT(date_of_birth, '00-%m-%d'))
                ) <= 55 THEN '56-55' 
        WHEN(
                DATE_FORMAT(NOW(), '%Y') - DATE_FORMAT(date_of_birth, '%Y') -(
                    DATE_FORMAT(NOW(), '00-%m-%d') < DATE_FORMAT(date_of_birth, '00-%m-%d'))
                ) <= 60 THEN '56-60' 
        
                        END) AS age,
                    COUNT(*) total
                FROM
                    members
                GROUP BY
                    age












SELECT
    (
        CASE WHEN(
            DATE_FORMAT(NOW(), '%Y') - DATE_FORMAT(date_of_birth, '%Y') -(
                DATE_FORMAT(NOW(), '00-%m-%d') < DATE_FORMAT(date_of_birth, '00-%m-%d'))
            ) <= 20 THEN '1-20' WHEN(
                DATE_FORMAT(NOW(), '%Y') - DATE_FORMAT(date_of_birth, '%Y') -(
                    DATE_FORMAT(NOW(), '00-%m-%d') < DATE_FORMAT(date_of_birth, '00-%m-%d'))
                ) <= 25 THEN '20-25' WHEN(
                    DATE_FORMAT(NOW(), '%Y') - DATE_FORMAT(date_of_birth, '%Y') -(
                        DATE_FORMAT(NOW(), '00-%m-%d') < DATE_FORMAT(date_of_birth, '00-%m-%d'))
                    ) <= 30 THEN '26-30' WHEN(
                        DATE_FORMAT(NOW(), '%Y') - DATE_FORMAT(date_of_birth, '%Y') -(
                            DATE_FORMAT(NOW(), '00-%m-%d') < DATE_FORMAT(date_of_birth, '00-%m-%d'))
                        ) <= 35 THEN '31-35' WHEN(
                DATE_FORMAT(NOW(), '%Y') - DATE_FORMAT(date_of_birth, '%Y') -(
                    DATE_FORMAT(NOW(), '00-%m-%d') < DATE_FORMAT(date_of_birth, '00-%m-%d'))
                ) <= 40 THEN '36-40' 

        
                        END) AS age,
                    COUNT(*) total
                FROM
                    members
                GROUP BY
                    age                    