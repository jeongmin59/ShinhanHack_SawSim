package com.example.backend.domain.popular.entity;

import com.example.backend.domain.common.BaseEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.locationtech.jts.geom.Point;

import javax.persistence.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Popular extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "POPULAR_ID")
    private Long id;

    private String storeName;
    private String thumbnail;
    private String category;
    @Column(columnDefinition = "geometry(Point,4326)")
    private Point locations;
    private Integer count;

    public void addCount() {
        this.count++;
    }

    public static Popular toEntity(String storeName, String category, Point location) {
        Popular popular = new Popular();
        popular.storeName = storeName;
        popular.thumbnail = "";
        popular.category = category;
        popular.locations = location;
        popular.count = 1;

        return popular;
    }


}
