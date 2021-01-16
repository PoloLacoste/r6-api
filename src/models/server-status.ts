export interface ServerStatus {
    PC:   PC;
    PS4:  PC;
    XBOX: PC;
}

export interface PC {
    "AppID ":         string;
    MDM:              string;
    SpaceID:          string;
    Category:         string;
    Name:             string;
    Platform:         string;
    Status:           string;
    Maintenance:      null;
    ImpactedFeatures: any[];
}
